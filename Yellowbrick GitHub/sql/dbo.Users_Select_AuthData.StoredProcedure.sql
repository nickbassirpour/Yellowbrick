USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_AuthData]    Script Date: 7/26/2023 9:27:51 AM ******/
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

CREATE Proc [dbo].[Users_Select_AuthData]
		@Email NVARCHAR(255)

AS

/*

		DECLARE 
			
			@_email NVARCHAR(255) = 'Test@email.com'

		EXEC dbo.Users_Select_AuthData
		
			@_email


*/


BEGIN

		SELECT 
				u.Id, 
				u.Email,
				u.FirstName,
				u.LastName,
				u.Mi,
				u.[Password],
				[Roles] = (
					SELECT 
							r.Id, 
							r.Name
					FROM 
							dbo.Roles AS r 
					inner join 
							dbo.UserRoles AS ur
					ON 
							r.Id = ur.RoleId
					WHERE 
							ur.UserId = u.Id
					FOR JSON AUTO
				)
		FROM 
				dbo.Users AS u 

		WHERE 
				u.Email = @Email
		AND 
				u.StatusId = 1
		AND
				u.isConfirmed = 1

END
GO
