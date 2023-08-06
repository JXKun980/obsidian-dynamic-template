// Global variables used
declare var module: any;
declare var app: any;
declare var g_template_config: any;

async function my_function(tp: any) {
    let refactor_content = await tp.file.selection();

    // Get first title to be used as the default new file name if exists, otherwise use generic name
    const content_title = /^[\s\n]*#+ (.*)/;
    const match = refactor_content.match(content_title);
    const default_file_name = match != null ? match[1] : "New Refactored Note";

    // Get new file name
    const new_note_name = await tp.system.prompt("Enter new note name", default_file_name, true);

    // Modify content 
    refactor_content = refactor_content.replace(/^# .*\n/gm, ''); // Remove level 1 heading
    refactor_content = refactor_content.replace(/^#(?=#+)/gm, ''); // Reduce all other heading level by 1

    // Configure universal template
    g_template_config.change(
        {
            extra_content: refactor_content,
            extra_tags: tp.file.tags,
            extra_links: {
                up: [tp.config.active_file.basename],
                down: [],
                prev: [],
                next: [],
                same: []
            }
        }
    )

    // Create new file and put the universal template into it
    const universal_template_tf = await tp.file.find_tfile("Universal Blueprint");
    await tp.file.create_new(universal_template_tf, new_note_name);

    return new_note_name;
}

module.exports = my_function;