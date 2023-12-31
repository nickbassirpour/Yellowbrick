USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 8/3/2023 10:09:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects All Users from dbo.Users with pagination
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY:  Harrison Cook
-- MODIFIED DATE:08/02/2023
-- Code Reviewer:Elijah Branscum
-- Note:added ability to get roles

CREATE PROC [dbo].[Users_SelectAll]
		@PageIndex INT,
		@PageSize INT

AS

/*
	DECLARE 

			@_pageIndex int = 0,
			@_pageSize int = 40

	EXEC dbo.Users_SelectAll

			@_pageIndex,
			@_pageSize


*/




BEGIN

DECLARE @offset INT = @PageIndex * @PageSize

		SELECT 
				u.Id, -- primary key
				u.Email,
				u.FirstName,
				u.LastName,
				u.Mi,
				u.AvatarUrl,
				u.IsConfirmed,
				st.Id,
				st.[Name],
				Role=(SELECT r.[Name] from dbo.Roles as r
					  INNER JOIN dbo.UserRoles as ur
					  ON ur.RoleId = r.Id
					  INNER JOIN dbo.Users as us
					  ON us.Id=ur.UserId
					  WHERE us.Id=u.Id
					  FOR JSON AUTO),
				

				TotalCount = COUNT(1) OVER()
		FROM 
				dbo.Users AS u 
		INNER JOIN 
				dbo.StatusTypes AS st 
		ON 
				u.StatusId = st.Id
		
		
		ORDER by u.Id
		

		OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS Only

		
END
GO
