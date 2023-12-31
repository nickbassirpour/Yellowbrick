USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectId_ByEmail]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects a user's id by email from dbo.Users 
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_SelectId_ByEmail]
		@Email NVARCHAR(255)

AS

/*

	DECLARE 
	
			@_email NVARCHAR(255) = 'FINALTESTOHYES@dispostable.com'

	EXEC dbo.Users_SelectId_ByEmail

			@_email


*/




BEGIN

		SELECT 
				u.Id, 
				u.FirstName,
				u.LastName,
				u.Mi,
				u.AvatarUrl
				
		FROM 
				dbo.Users AS u 
		INNER JOIN 
				dbo.StatusTypes AS st 
		ON 
				u.StatusId = st.Id

		WHERE u.Email = @Email

END
GO
