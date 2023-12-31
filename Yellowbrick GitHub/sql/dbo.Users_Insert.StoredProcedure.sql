USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Insert a new user into the dbo.Users table. 
-- Code Reviewer: Wendy Ruiz

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_Insert]
		@Email NVARCHAR(255),
		@FirstName NVARCHAR(100),
		@LastName NVARCHAR(100),
		@Mi NVARCHAR(2) = null,
		@AvatarUrl VARCHAR(255) = null,
		@Password VARCHAR(100),
		@UserToken VARCHAR(200),
		@Id INT OUTPUT

AS

/*

		DECLARE

				@_email NVARCHAR(255) = 'GandalfTheGrey@gmail.com',
				@_firstName NVARCHAR(100) = 'Gandalf',
				@_lastName NVARCHAR(100) = 'Grey',
				@_mi NVARCHAR(2) = 'J',
				@_avatarUrl VARCHAR(255) = 'ImAwHuUuT.jpeg',
				@_password VARCHAR(100) = 'Password!1',
				@_userToken VARCHAR(200) = '63b06a66-849a-4659-bf2a-956eafcabb97',
				@_id INT

		EXEC dbo.Users_Insert

				@_email,
				@_firstName,
				@_lastName,
				@_mi,
				@_avatarUrl,
				@_password,
				@_userToken,
				@_id OUTPUT



*/




BEGIN


	INSERT INTO 

		[dbo].[Users]

			(
			[Email],
			[FirstName],
			[LastName],
			[Mi],
			[AvatarUrl],
			[Password],
			[IsConfirmed],
			[StatusId]
		) VALUES (
			@Email,
			@FirstName,
			@LastName,
			@Mi,
			@AvatarUrl,
			@Password,
			0,
			1
			);

	SET @Id = SCOPE_IDENTITY()

	DECLARE @UserRoleId INT = (SELECT 
									r.Id
								FROM 
									dbo.Roles AS r
								INNER JOIN
									dbo.TokenTypes as tt
								ON 
									r.Name = tt.Name
								INNER JOIN
									dbo.UserTokens AS ut
								ON
									tt.Id = ut.TokenTypeId
								WHERE 
									ut.Token = @UserToken)

	INSERT INTO

		[dbo].[UserRoles]

			(
			[UserId],
			[RoleId]
		) VALUES (
			@Id,
			@UserRoleId
			);
				
END
GO
