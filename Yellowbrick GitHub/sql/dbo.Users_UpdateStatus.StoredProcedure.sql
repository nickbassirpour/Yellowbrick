USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatus]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Updates user StatusId of user in dbo.Users. 
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:


CREATE PROC [dbo].[Users_UpdateStatus]
		@Email NVARCHAR(255),
		@StatusId INT

AS

/*

		DECLARE 
			@_email NVARCHAR(255) = 'Test@email.com',
			@_statusId INT = 2

		EXEC [dbo].[Users_UpdateStatus]
			@_email,
			@_statusId

*/



BEGIN
	
	IF EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [EMAIL] = @Email AND [StatusId] = @StatusId)
	BEGIN
		DECLARE @Status NVARCHAR(30);

		SELECT @Status = [Name] 
			FROM 
				[dbo].[StatusTypes] AS st
			INNER JOIN
				[dbo].[Users] AS u
			ON
				u.StatusId = st.Id
			WHERE
				u.Email = @Email

		DECLARE @ErrorMessage NVARCHAR(2048) = CONCAT('This account is already ', @Status, '!');
		RAISERROR (@ErrorMessage, 16, 1);
		RETURN;
	END

		UPDATE 
				[dbo].[Users] 
		SET 
				[StatusId] = @StatusId,
				[DateModified] = GETUTCDATE()

		WHERE 
				Email = @Email


END
GO
