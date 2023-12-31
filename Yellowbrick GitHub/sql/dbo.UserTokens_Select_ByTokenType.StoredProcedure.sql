USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Select_ByTokenType]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects a user by Token from dbo.Users 
-- Code Reviewer: Lazarus Wright

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[UserTokens_Select_ByTokenType]
		@Token VARCHAR(200)


/*


Execute dbo.UserTokens_Select_ByTokenType @Token = '266D7B28-B942-4888-B0ED-E6C1E22602BB'


*/


AS

BEGIN

		SELECT 
				u.Id, -- primary key
				u.Email,
				u.FirstName,
				u.LastName,
				u.Mi,
				u.[Password],
				[Role] = (
					SELECT 
							r.Name
					FROM 
							dbo.Roles AS r 
					INNER JOIN
							dbo.UserRoles AS ur
					ON 
							r.Id = ur.RoleId
					WHERE 
							ur.UserId = u.Id
				)
		FROM 
				dbo.Users AS u 
		INNER JOIN 
				dbo.StatusTypes AS st 
		ON 
				u.StatusId = st.Id

		WHERE 
			EXISTS (
				SELECT 1
				FROM dbo.UserTokens AS ut
				WHERE ut.UserId = u.Id AND ut.Token = @Token
			)


END
GO
