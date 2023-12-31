USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_Dashboard]    Script Date: 8/8/2023 1:03:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/27/2023
-- Description: Selects All Users from dbo.Users with pagination
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SelectAll_Dashboard]
		

AS

/*
	

	EXEC dbo.Users_SelectAll_Dashboard


*/



BEGIN

	DECLARE @Client NVARCHAR(50) = 'Client'
	DECLARE @Agent NVARCHAR(50) = 'Agent'

		SELECT 
			'Client' AS Role,
			COUNT(*) AS Count
		FROM 
			dbo.Clients AS c

		UNION ALL

		SELECT
			'Agent' AS Role,
			COUNT(*) AS Count
		FROM 
			dbo.Users AS u
		INNER JOIN
			dbo.UserRoles AS ur
		ON
			u.Id = ur.UserId
		INNER JOIN	
			dbo.Roles AS r
		ON 
			ur.RoleId = r.Id
		WHERE 
			r.Name = @Agent
		GROUP BY r.Name		

END
GO
