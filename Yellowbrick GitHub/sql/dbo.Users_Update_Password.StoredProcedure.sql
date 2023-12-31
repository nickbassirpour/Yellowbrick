USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update_Password]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Update a user's password after verifying token in dbo.UserTokens
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_Update_Password]
		@ResetPasswordToken VARCHAR(200),
		@Email NVARCHAR(255),
		@Password VARCHAR(100)

AS

/*
	DECLARE
			@token varchar(200) = 'c37b78cc-0e7c-4367-a35a-9718c70cd7f6',
			@email nvarchar(255) = 'FINALTESTOHYES@dispostable.com',
			@password varchar(100) = 'ATESTPASSWORD'
			

	exec [dbo].[Users_Update_Password]
			@token,
			@email,
			@password


*/




BEGIN TRY

	BEGIN TRANSACTION

		IF NOT EXISTS (SELECT 1 FROM [dbo].[UserTokens] WHERE Token = @ResetPasswordToken)
		BEGIN
			DECLARE @ErrorMessage NVARCHAR(2048) = 'That request is no longer available!';
			RAISERROR (@ErrorMessage, 16, 1)
		END

		ELSE

			UPDATE [dbo].[Users] 

				SET
					[Password] = @Password,
					[DateModified] = GETUTCDATE()
				FROM 
					dbo.Users AS u 
				INNER JOIN				
					dbo.UserTokens AS ut ON u.Id = ut.UserId
				WHERE 				
					u.Email = @Email
				AND 
					ut.Token = @ResetPasswordToken 

				EXEC [dbo].[UserTokens_Delete_ByToken] @ResetPasswordToken
				
	COMMIT TRANSACTION

END TRY

BEGIN CATCH

	IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
		DECLARE @MSG NVARCHAR(2048) = ERROR_MESSAGE()
		RAISERROR (@MSG, 16, 1)

END CATCH

GO
