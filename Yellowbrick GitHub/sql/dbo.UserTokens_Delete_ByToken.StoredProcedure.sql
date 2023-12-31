USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Delete_ByToken]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Deletes a token from the dbo.UserTokens table. 
-- Code Reviewer: Wendy Ruiz

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[UserTokens_Delete_ByToken]
		@Token VARCHAR(200)

AS


BEGIN

		DELETE FROM 
				[dbo].[UserTokens]	
		WHERE 
				[Token] = @Token

END
GO
