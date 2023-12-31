USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_DashboardById]    Script Date: 8/8/2023 1:03:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nicholas Bassirpour
-- Create date: 08/07/2023
-- Description: Select All for Agent Dashboard with Id
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:


CREATE PROC [dbo].[Users_SelectAll_DashboardById]
		@Id int

AS

/*
	
	DECLARE @_id INT = 128

	EXEC dbo.Users_SelectAll_DashboardById

	@_id


*/



BEGIN


	DECLARE @Client NVARCHAR(50) = 'Client'
	DECLARE @Agent NVARCHAR(50) = 'Agent'
	DECLARE @Proposals NVARCHAR(50) = 'Proposals'
	DECLARE @Appointments NVARCHAR(50) = 'Appointments'

		SELECT 
			'Client' AS Tab,
			COUNT(*) AS Count
		FROM 
			dbo.Clients AS c
		WHERE 
			CreatedBy = @Id

		UNION ALL

		SELECT
			'Agent' AS Tab,
			COUNT(*) AS Count
		FROM 
			dbo.Agents AS a

		UNION ALL

		SELECT
			'Proposal' AS Tab,
			COUNT(*) AS Count
		FROM
			dbo.Proposals AS p
		WHERE
			CreatedBy = @Id

		UNION ALL

		SELECT
			'Appointments' AS Tab,
			COUNT(*) AS Count

		FROM
			dbo.Appointments AS ap
		WHERE
			CreatedBy = @Id
	

END
GO
