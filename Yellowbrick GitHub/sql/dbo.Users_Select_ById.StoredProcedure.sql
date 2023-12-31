USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_ById]    Script Date: 7/26/2023 9:27:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nick Bassirpour
-- Create date: 07/01/2023
-- Description: Selects a user by Id from dbo.Users 
-- Code Reviewer: Elijah Branscum

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_Select_ById]
		@Id INT


/*


Execute dbo.Users_Select_ById @Id = 29


*/


AS

BEGIN

		SELECT 
				u.Id, -- primary key
				u.Email,
				u.FirstName,
				u.LastName,
				u.Mi,
				u.AvatarUrl,
				u.IsConfirmed,
				st.Id,
				st.[Name]
				
		FROM 
				dbo.Users AS u 
		INNER JOIN 
				dbo.StatusTypes AS st 
		ON 
				u.StatusId = st.Id

		WHERE u.Id = @Id




END
GO
