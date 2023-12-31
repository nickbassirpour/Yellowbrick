USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_OfRoleTypeV2]    Script Date: 8/7/2023 11:58:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Elijah Branscum
-- Create date: 08/03/2023
-- Description: Selects All Users (including their roles) from dbo.Users with pagination with a given role
-- Code Reviewer: Wendy Ruiz

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SelectAll_OfRoleTypeV2]
		@RoleId INT,
		@PageIndex INT,
		@PageSize INT

AS

/*------Test Code-------

	DECLARE 
			@_roleId INT = 2,
			@_pageIndex int = 0,
			@_pageSize int = 3

	EXEC dbo.Users_SelectAll_OfRoleTypeV2
			@_roleId,
			@_pageIndex,
			@_pageSize

*/




BEGIN

		DECLARE @offset INT = @PageIndex * @PageSize

		SELECT 
				u.Id,
				Email,
				FirstName,
				LastName,
				Mi,
				AvatarUrl,
				IsConfirmed,
				st.Id,
				st.[Name],
			    Roles = (SELECT R.Id
								,R.[Name]
				         FROM dbo.UserRoles As UR  
						 INNER JOIN	dbo.Roles as R ON ur.RoleId = r.Id 
						 WHERE UR.UserId = U.Id
						FOR JSON AUTO),
				TotalCount = COUNT(1) OVER()
		FROM 
				dbo.Users AS u INNER JOIN dbo.StatusTypes AS st ON	u.StatusId = st.Id
				JOIN dbo.UserRoles As URO ON URO.UserId = U.ID
				JOIN dbo.Roles as RL ON URO.RoleId = RL.Id 
				WHERE RL.Id = @RoleId

		ORDER BY u.Id

		OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS Only
	
END
GO
