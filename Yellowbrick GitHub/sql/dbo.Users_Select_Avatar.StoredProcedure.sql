USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_Avatar]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects a user by Email from dbo.Users 
-- Code Reviewer: Elijah Branscum

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE Proc [dbo].[Users_Select_Avatar]
		@Email NVARCHAR(255)

AS

/*

		DECLARE 
			
			@_email NVARCHAR(255) = 'Test@email.com'

		EXEC dbo.Users_Select_Avatar
		
			@_email


*/


BEGIN

		SELECT 
				[AvatarUrl]
		FROM 
				dbo.Users AS u 

		WHERE 
				u.Email = @Email

END
GO
