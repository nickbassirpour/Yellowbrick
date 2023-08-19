USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Roles_SelectAll]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects all roles from dbo.Roles
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Roles_SelectAll]


AS

/*

EXEC [dbo].[Roles_SelectAll]

*/

BEGIN 

	SELECT	

		[Id],
		[Name]

	FROM	
		
		[dbo].[Roles]

END
		
GO
