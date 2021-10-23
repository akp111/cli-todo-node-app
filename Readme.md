# Note Keeping Node App

1. **List Operation**: Lists out all the items
	**Command**: `node app.js list`

2. **Write Operation**: Writes a note
	**Command**: `node app.js write --title "akp" --body "awesome project!"`

3. **List an item via title** : You can list a specific item by their title
	**Command** : `node app.js show --title "akp"`

4. **Update an item via title**: You can update a specific item by mentioning the title and then you can specify whether you want to update title or body or both
	**Command(s)**: 
	`node app.js update --title "akp" --new-title "akp2"  --new-body "it 		  works"`
	Or
	

    `node app.js update --title "akp" --new-title "akp2"`
	
	Or
	

    `node app.js update --title "akp" --new-body "It works"`

5. **Delete an item via title**: You can delete a specific item by their title
	**Command**: `node app.js remove-one --title "akp"`

6. **Delete all item**: Removes all item
	**Command**: `node app.js remove-all`