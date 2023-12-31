USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAllV2]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Elijah Branscum
-- Create date: 07/01/2023
-- Description: Selects All Users from dbo.Users without pagination
-- Code Reviewer: Wendy Ruiz

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SelectAllV2]


AS

/*

	EXEC dbo.Users_SelectAllV2

*/




BEGIN

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

END
GO
