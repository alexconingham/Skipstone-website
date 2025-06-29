Portrait Loading Issue in Godot

The images seem to exist but aren't loading correctly in the game. This could be due to several issues:

1. Import settings in Godot - make sure the images are properly imported as CompressedTexture2D
2. Path resolution - ensure paths are correctly formatted (res:// vs absolute paths)
3. Image format - ensure images are in PNG format with correct dimensions
4. Permission issues - make sure the game has permission to read the files

Debug steps:
1. Check the console output for error messages
2. Try reimporting the textures in the Godot editor
3. Verify the images open correctly outside of Godot
4. Try using different loading methods (load() vs ResourceLoader.load())

Current structure:
assets/images/portraits/the_quiet_type/ - Player character portraits
assets/images/portraits/enemies/grunt/ - Grunt enemy portraits
assets/images/portraits/enemies/elite/ - Elite enemy portraits
assets/images/portraits/enemies/boss/ - Boss enemy portraits

Naming convention:
Player: the_quiet_type_D1.png, the_quiet_type_D2.png, etc.
Enemies: enemy_name.png (lowercase with underscores) 