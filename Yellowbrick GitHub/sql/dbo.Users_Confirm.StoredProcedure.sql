USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Confirm]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Inserst a new user into the dbo.Users table. 
-- Code Reviewer: Elijah Branscum

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_Confirm]
		@Email NVARCHAR(255),
		@NewUserToken VARCHAR(200)

AS

/*

	declare @email nvarchar(255) = 'THEGREATESTTEST@dispostable.com',
			@token varchar(200) = 'be3971ea-32ff-4ef4-8f72-687a8aaf831e'

	exec [dbo].[Users_Confirm]
			@email,
			@token


*/

BEGIN TRY

	BEGIN TRANSACTION

		--IF NOT EXISTS (SELECT 1 FROM [dbo].[UserTokens] WHERE Token = @NewUserToken)
		--BEGIN
		--	DECLARE @ErrorMessage NVARCHAR(2048) = 'That request is no longer available!';
		--	RAISERROR (@ErrorMessage, 16, 1)
		--END

		--ELSE


			UPDATE [dbo].[Users]
			
				SET 

					[IsConfirmed] = 1,
					[DateModified] = GETUTCDATE()

				FROM 
					[dbo].[Users] as u
				INNER JOIN
					[dbo].[UserTokens] AS ut on u.Id = ut.UserId
				WHERE 
					u.Email = @Email
				AND
					ut.Token = @NewUserToken

				EXEC [dbo].[UserTokens_Delete_ByToken] @NewUserToken

		COMMIT TRANSACTION


END TRY

BEGIN CATCH

	If @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
		DECLARE @MSG NVARCHAR(2048) = ERROR_MESSAGE()
		RAISERROR (@MSG, 16, 1)
			
END CATCH

GO
