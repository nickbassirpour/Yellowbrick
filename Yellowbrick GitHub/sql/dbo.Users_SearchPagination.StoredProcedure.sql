USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SearchPagination]    Script Date: 7/31/2023 10:50:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Harrison Cook
-- Create date: 07/26/2023
-- Description: Selects All Users from dbo.Users with pagination and by search term
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SearchPagination]
		@Query NVARCHAR(204),
		@PageIndex INT,
		@PageSize INT

AS

/*
	DECLARE 
			@Query NVARCHAR(204)='johnson',
			@_pageIndex int = 0,
			@_pageSize int = 20

	EXEC dbo.Users_SearchPagination
			@Query,
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
				

				TotalCount = COUNT(1) OVER()
		FROM 
				dbo.Users AS u 
		INNER JOIN 
				dbo.StatusTypes AS st 
		ON 
				u.StatusId = st.Id
		WHERE (
        u.LastName LIKE '%' + @Query + '%'
        OR u.FirstName LIKE '%' + @Query + '%'
    )
    OR (
        u.LastName + ' ' + u.FirstName LIKE '%' + @Query + '%'
    )
    OR (
        u.FirstName + ' ' + u.LastName LIKE '%' + @Query + '%'
    )
    OR (
        u.FirstName + ' ' + u.Mi + ' ' + u.LastName LIKE '%' + @Query + '%'
    )
    OR (
        u.FirstName + ' ' + u.LastName + ' ' + u.Mi LIKE '%' + @Query + '%'
    )
    OR (
        u.LastName + ' ' + u.Mi + ' ' + u.FirstName LIKE '%' + @Query + '%'
    )
    OR (
        u.LastName + ' ' + u.Mi + ' ' + u.FirstName + ' ' + u.LastName LIKE '%' + @Query + '%'
    )

		ORDER by u.Id
		OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS Only

		
END
GO
