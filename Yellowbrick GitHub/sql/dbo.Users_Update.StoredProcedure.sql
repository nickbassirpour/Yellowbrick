USE [YellowBrick]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update]    Script Date: 8/2/2023 11:34:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Author: Elijah Branscum
-- Create date: 07/25/2023
-- Description: Update a user in the dbo.Users table at the given Id. 
-- Code Reviewer: Wendy Ruiz

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Users_Update]
		@FirstName NVARCHAR(100),
		@LastName NVARCHAR(100),
		@Mi NVARCHAR(2) = null,
		@AvatarUrl VARCHAR(255) = null,
		@Id INT

AS

/*

	DECLARE
			@_firstName NVARCHAR(100) = 'Harry',
			@_lastName NVARCHAR(100) = 'Potter',
			@_mi NVARCHAR(2) = 'J',
			@_avatarUrl VARCHAR(255) = 'https://th.bing.com/th/id/OIP.UOGJfSvucfoZMWNaFkAKUgHaFj?w=232&h=180&c=7&r=0&o=5&pid=1.7',
			@_id INT = 4

	EXEC [dbo].[Users_Update]
			@_email,
			@_firstName,
			@_lastName,
			@_mi,
			@_avatarUrl,
			@_id

*/




BEGIN

	UPDATE	[dbo].[Users]

	   SET 
			[FirstName] = @FirstName,
			[LastName] = @LastName,
			[Mi] = @Mi,
			[AvatarUrl] = @AvatarUrl,
			[DateModified] = GETUTCDATE()

	 WHERE	Id = @Id
			
END
GO
