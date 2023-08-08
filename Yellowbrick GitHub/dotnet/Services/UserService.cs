using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Reflection.PortableExecutable;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.Lookups;
using Sabio.Models.Requests.Users;
using System.Text.RegularExpressions;
using System.Reflection;

namespace Sabio.Services
{
    public class UserService : IUserService, IMapBaseUser
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Email = "Gregorio@gmail.com"
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        private IUserAuthData Get(string email, string password)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            string passwordFromDb = "";
            UserBase user = null;

            //get user object from db;

            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);

            return user;
        }

        public int Create(UserAddRequest userModel)
        {
            string procName = "[dbo].[Users_Insert]";
            int id = 0;

            string password = userModel.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(userModel, col);
                col.AddWithValue("@Password", hashedPassword);

                SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        public async Task<bool> Login(UserLoginRequest loginModel)
        {
            bool isSuccessful = false;

            IUserAuthData response = GetAuthData(loginModel);

            if (response != null)
            {
                Claim fullName = new Claim("UserAuthenticationClaim", "Yellowbrick");
                await _authenticationService.LogInAsync(response, new Claim[] { fullName });
                isSuccessful = true;
            } else
            {
                isSuccessful = false;
            }

            return isSuccessful;
        }

        public BaseUser VerifyEmail(string email)
        {
            string procName = "[dbo].[Users_SelectId_ByEmail]";

            BaseUser user = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                user = MapBaseUser(reader, ref startingIndex);

            }
            );
            return user;
        }

        public IUserAuthData GetAuthData(UserLoginRequest loginModel)
        {
            string procName = "[dbo].[Users_Select_AuthData]";

            UserBase userBase = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", loginModel.Email);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                UserAuth userAuth = MapSingleUserAuth(reader, ref startingIndex);

                if (userAuth != null)
                {
                    string storedHashedPassword = userAuth.Password;
                    string enteredPassword = loginModel.Password;
                    bool isPasswordCorrect = BCrypt.BCryptHelper.CheckPassword(enteredPassword, storedHashedPassword);
                    if (isPasswordCorrect)
                    {
                        userBase = new UserBase();

                        List<string> roleNames = new List<string>();
                        if (userAuth.Roles != null)
                        {
                            foreach (LookUp lookup in userAuth.Roles)
                            {
                                roleNames.Add(lookup.Name);
                            }
                        }

                        userBase.Id = userAuth.Id;
                        userBase.Name = $"{userAuth.FirstName} {(string.IsNullOrEmpty(userAuth?.Mi) ? "" : userAuth.Mi + " ")}{userAuth.LastName}";
                        userBase.Email = userAuth.Email;
                        userBase.Roles = roleNames;
                        userBase.TenantId = "Yellowbrick Financial";
                    }
                }

            });
                return userBase;
        }

        public string GetAvatarUrl(string email)
        {
            string procName = "[dbo].[Users_Select_Avatar]";

            string avatarUrl = null;

            _dataProvider.ExecuteCmd(procName, 
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, 
             delegate (IDataReader reader, short set)
            {
                avatarUrl = reader.GetSafeString(0);
            }
           );
            return avatarUrl;
        }

        public void Confirm(string email, string token)
        {
            string procName = "[dbo].[Users_Confirm]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
                col.AddWithValue("@NewUserToken", token);
            },
            returnParameters: null);
        }

        public void UpdatePassword(UserChangePasswordRequest updateModel)
        {
            string procName = "[dbo].[Users_Update_Password]";

            string password = updateModel.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ResetPasswordToken", updateModel.Token);
                col.AddWithValue("@Email", updateModel.Email);
                col.AddWithValue("@Password", hashedPassword);
            },
            returnParameters: null);
        }

        public User GetById(int id)
        {
            string procName = "[dbo].[Users_Select_ById]";

            User user = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                user = MapSingleUser(reader, ref startingIndex);
            }
            );
            return user;
        }

        public Paged<User> GetAll(int pageIndex, int pageSize)
        {
            string storedProc = "[dbo].[Users_SelectAll]";
            Paged<User> pagedList = null;
            List<User> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, param =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    User user = MapSingleUserWithRole(reader, ref startingIndex);


                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<User>();
                    }

                    list.Add(user);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<DashboardModel> GetAllAdminDashboard()
        {
            string storedProc = "[dbo].[Users_SelectAll_DashboardV2]";
            List<DashboardModel> list = null;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: null,
                (reader, recordSetIndex) =>
                {
                    int idx = 0;
                    DashboardModel model = new DashboardModel();

                    model.Tab = reader.GetSafeString(idx++);
                    model.Count = reader.GetSafeInt32(idx++);

                    if (list == null)
                    {
                        list = new List<DashboardModel>();
                    }

                    list.Add(model);
                }
            );
            
            return list;
        }

        public List<DashboardModel> GetAllDashboardById(int id)
        {
            string storedProc = "[dbo].[Users_SelectAll_DashboardById]";
            List<DashboardModel> list = null;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
                (reader, recordSetIndex) =>
                {
                    int idx = 0;
                    DashboardModel model = new DashboardModel();

                    model.Tab = reader.GetSafeString(idx++);
                    model.Count = reader.GetSafeInt32(idx++);

                    if (list == null)
                    {
                        list = new List<DashboardModel>();
                    }

                    list.Add(model);
                }
            );

            return list;
        }

        public Paged<User> GetAllOfRoleTypeV2(int role, int pageIndex, int pageSize)
        {
            string storedProc = "[dbo].[Users_SelectAll_OfRoleTypeV2]";
            Paged<User> pagedList = null;
            List<User> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, param =>
            {
                param.AddWithValue("@RoleId", role);
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    User user = MapSingleUserWithRole(reader, ref startingIndex);


                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<User>();
                    }

                    list.Add(user);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<User> GetAllUnpaginated()
        {
            string storedProc = "[dbo].[Users_SelectAllV2]";
            List<User> list = null;

            _dataProvider.ExecuteCmd(storedProc, null, (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    User user = MapSingleUser(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<User>();
                    }

                    list.Add(user);
                }
                );
            return list;
        }
        public string GetPassByEmail(string email)
        {
            string storedProc = "[dbo].[Users_SelectPass_ByEmail]";

            string password = null;



            _dataProvider.ExecuteCmd(storedProc, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                password = reader.GetSafeString(startingIndex++);
            }
            );
            return password;
        }

        public UserAuth GetAccountByEmail(string email)
        {
            string storedProc = "[dbo].[Users_Select_AuthData]";

            UserAuth user = null;

            _dataProvider.ExecuteCmd(storedProc, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                user = MapSingleUserAuth(reader, ref startingIndex);
            }
            );
            return user;
        }

        public void UpdateStatus(int statusTypeId, string email)
        {
            string procName = "[dbo].[Users_UpdateStatus]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
                col.AddWithValue("@StatusId", statusTypeId);
            }, returnParameters: null);
        }

        public string GetCustomErrorMessage(int errorNumber)
        {
            switch (errorNumber)
            {
                case 2601:
                    return "That Email already exists!";
                default:
                    return "An error occurred while processing the request";
            }
        }

        public void CreateToken(int userId, int? tokenType, string token)
        {
            string procName = "[dbo].[UserTokens_Insert]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Token", token);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@TokenTypeId", tokenType);
            }, returnParameters: null);
        }

        public void DeleteToken(int userId, string token)
        {
            string procName = "[dbo].[UserTokens_Delete_ByToken]";

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Token", token);
            }, returnParameters: null);
        }

        public UserAuth GetByToken(string token)
        {
            string procName = "[dbo].[UserTokens_Select_ByTokenType]";

            UserAuth user = null;

                _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    user = MapSingleUserAuth(reader, ref startingIndex);
                }

                );

            return user;
        }
        public Paged<User> SearchUser(int pageIndex, int pageSize,string query)
        {
            string storedProc = "[dbo].[Users_SearchPagination]";
            Paged<User> pagedList = null;
            List<User> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, param =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    User user = MapSingleUserWithRole(reader, ref startingIndex);


                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<User>();
                    }

                    list.Add(user);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Update(UserUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery("[dbo].[Users_Update]", (param) =>
            {
                AddCommonParamsV2(model, param);
            });
        }

        private static User MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            User user = new User();
            user.Status = new LookUp();

            user.Id = reader.GetSafeInt32(startingIndex++);
            user.Email = reader.GetSafeString(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);
            user.IsConfirmed = reader.GetSafeBool(startingIndex++);
            user.Status.Id = reader.GetSafeInt32(startingIndex++);
            user.Status.Name = reader.GetSafeString(startingIndex++);

            return user;
        }
        private static User MapSingleUserWithRole(IDataReader reader, ref int startingIndex)
        {
            User user = new User();
            user.Status = new LookUp();

            user.Id = reader.GetSafeInt32(startingIndex++);
            user.Email = reader.GetSafeString(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);
            user.IsConfirmed = reader.GetSafeBool(startingIndex++);
            user.Status.Id = reader.GetSafeInt32(startingIndex++);
            user.Status.Name = reader.GetSafeString(startingIndex++);
            user.Roles= reader.DeserializeObject<List<LookUp>>(startingIndex++);

            return user;
        }

        private static UserAuth MapSingleUserAuth(IDataReader reader, ref int startingIndex)
        {
            UserAuth user = new UserAuth();

            user.Id = reader.GetSafeInt32(startingIndex++);
            user.Email = reader.GetSafeString(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.Password = reader.GetSafeString(startingIndex++);
            user.Roles = reader.DeserializeObject<List<LookUp>>(startingIndex++);
           
            return user;
        }

        private static void AddCommonParams(UserAddRequest model, SqlParameterCollection col)
        {

            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Firstname", model.FirstName);
            col.AddWithValue("@Mi", model.Mi);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
            col.AddWithValue("@UserToken", model.UserToken);


        }

        private static void AddCommonParamsV2(UserUpdateRequest model, SqlParameterCollection param)
        {
            param.AddWithValue("@Firstname", model.FirstName);
            param.AddWithValue("@Mi", model.Mi);
            param.AddWithValue("@LastName", model.LastName);
            param.AddWithValue("@AvatarUrl", model.AvatarUrl);
            param.AddWithValue("@Id", model.Id);
        }

        public BaseUser MapBaseUser(IDataReader reader, ref int startingIndex)
        {
            BaseUser user = new BaseUser();

            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);

            return user;
        }

    }
}