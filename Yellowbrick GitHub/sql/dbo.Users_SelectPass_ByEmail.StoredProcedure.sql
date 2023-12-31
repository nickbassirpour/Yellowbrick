USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectPass_ByEmail]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects a user's password by email from dbo.Users 
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SelectPass_ByEmail]
		@Email NVARCHAR(255)

AS

/*

	DECLARE 
	
			@_email NVARCHAR(255) = 'Test@email.com'

	EXEC dbo.Users_SelectPass_ByEmail

			@_email


*/




BEGIN

		SELECT 
				u.[Password]

		FROM dbo.Users AS u 

		WHERE u.Email = @Email




END
GO
