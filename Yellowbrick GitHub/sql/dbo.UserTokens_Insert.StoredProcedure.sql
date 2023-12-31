USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Insert]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Insert a new token into the dbo.UserTokens table. 
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[UserTokens_Insert]
		@Token VARCHAR(200),
		@UserId INT,
		@TokenTypeId INT

AS

/*


		DECLARE 
				@_token VARCHAR(200) = 'C2F9E79P-FE88-4E7A-9E47-1B9C03E87637',
				@_userId INT = 1,
				@_tokenTypeId INT = 2

		EXEC dbo.UserTokens_Insert

				@_token,
				@_userId,
				@_tokenTypeId

	


*/


BEGIN


	INSERT INTO 

			[dbo].[UserTokens] (
					[Token],
					[UserId],
					[TokenTypeId]

			) VALUES (

					@Token,
					@UserId,
					@TokenTypeId

			);				

END
GO
