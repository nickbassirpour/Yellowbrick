USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[StatusTypes_SelectAll]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects all StatusTypes from dbo.StatusTypes
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[StatusTypes_SelectAll]


AS

/*

EXEC [dbo].[StatusTypes_SelectAll]

*/




BEGIN 

	SELECT		

		[Id],
		[Name]

	FROM	
	
		[dbo].[StatusTypes]

END
		
GO
