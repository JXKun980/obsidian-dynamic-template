# Dynamic Template for Obsidian
This project provides a set of scripts and templater templates that can together create a dynamic template system on top of the Obsidian's Templater Plugin and Breadcrumbs Plugin.

This system allows you to:
- Only put in shared template texts in a single template file and fetch the parts that are different in each template from a JavaScript script, therefore minimizing redundancy and places to change should you want to change it.
- Infer template contents based on the document name. E.g. Sequential Note Template allows auto filling of the *previous* and *next* links used by the Breadcrumbs Plugin, by inferring the current note index from the title.
- Refactor parts of current note to a new note with a template, automatically creating *up* links from Breadcrumbs Plugin to the original note, and moving all tags from original note to the new one.

Since all templates are written in JavaScript (or TypeScript), you could create your own dynamic templates, and this set of scripts gives you an idea of a framework that can do it.

## Get Started
- Ensure you have *Templater* and *Breadcrumbs* plugin installed.
- Set the *User Script Functions / Script file folder location* in Templater configuration to a place of your choice, and put in the scripts from this repository.
- Set the *Template folder location* in Templater configuration to a place of your choice, and put in the templates from the blueprints folder in this repository.
- Set the *Startup Templates* to the *Startup Code.md* template file.
- Compile the .ts files to .js files using `tsc` in the command prompt, in each of the script folders
- Add a hotkey to *Templater: Insert ../Refactor Blueprint.md* through the "+" button in the *Template Hotkeys* configuration. This will be the key for refactoring selected texts in a file.
- Add a hotkey to *Templater: Insert ../Universal Blueprint.md* through the "+" button in the *Template Hotkeys* configuration. This will be the key for add a template to a file.

