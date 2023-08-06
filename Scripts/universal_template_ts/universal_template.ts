// Declare existing global variables
declare var module: any;
declare var app: any;
declare var g_template_config: any;
// TODO: Why initaolize is there

async function my_function(tp: any) {
	// Proprocessing
	const tfile = await tp.config.target_file; // get file handler of inserting file
    const old_content = await tp.file.content; // get existing content before insertion of template

	// Template class definitions
	class BasicNoteTemplate {
		name = "Basic Note";
		tags: string;
		links: {
			up: string, 
			down: string, 
			prev: string, 
			next: string, 
			same: string
		};
		content: string;

		initialize() {
			this.init_tags();
			this.init_links();
			this.init_content();
		}
		init_tags() {
			this.tags = `${g_template_config.extra_tags}`;
		}
		init_links() {
			this.links = {
				up: `Up:: ${g_template_config.extra_links.up}`,
				down: `Down:: ${g_template_config.extra_links.down}`,
				prev: `Prev:: ${g_template_config.extra_links.prev}`,
				next: `Next:: ${g_template_config.extra_links.next}`,
				same: `Same:: ${g_template_config.extra_links.same}`,
			};
		}
		init_content() {
			this.content = old_content + g_template_config.extra_content;
		}
	}

	class SequentialNoteTemplate extends BasicNoteTemplate {
		name = "Sequential Note";
		index: number;
		title: string;
		initialize() {
			super.initialize();
			this.init_index_title();
		}
		init_index_title() {
			const title_token = tp.file.title.split(' ');
			if (isNaN(Number(title_token[title_token.length-1]))) throw new Error("Title do not match format of Sequential Note");
			this.index = Number(title_token.slice(-1)) // Numbers
			this.title = title_token.slice(-1).join(' ');
		}
		init_links() {
			super.init_links();

			const base_prev = this.index - 1 > 0 ? `[[${this.title} ${(this.index - 1)}]]` : '';
			this.links.prev = `Prev:: ${base_prev} ${g_template_config.extra_links.prev}`;

			const base_next = `[[${this.title} ${(this.index + 1)}]]`;
			this.links.next = `Next:: ${base_next} ${g_template_config.extra_links.next}`;
		}
	}

	class UniversityNoteTemplate extends BasicNoteTemplate {
		name = "University Note";
		subject: string;
		type: string;
		index: number;

		initialize() {
			super.initialize();
			this.init_subject_type_index();
		}

		init_subject_type_index() {
			const title_token = tp.file.title.split(' ');
			if (title_token.length != 3 || isNaN(title_token.slice(-1))) throw new Error("Title do not match format of University Note");
			this.subject = title_token[0] // All Caps and Numebrs
			this.type = title_token[1] // PascalCase
			this.index = Number(title_token[2]) // Numbers
		}
	
		init_tags() {
			const temp: Array<string> = [];
			temp.push("#" + this.subject);
			if (this.type) {
				let tag = this.type.toLowerCase() == "workshop" ? "tutorial" : this.type.toLowerCase();
				temp.push("#" + tag);
			}
			const base_tags = temp.join(' ');
			this.tags = `${base_tags} ${g_template_config.extra_tags}`;
		}
	
		init_links() {
			this.links.up = `Up:: [[MOC ${this.subject}]] ${g_template_config.extra_links.up}`

			const base_link_prev = this.index - 1 > 0 ? `[[${this.subject} ${this.type} ${(this.index - 1)}]]` : '';
			this.links.prev = `Prev:: ${base_link_prev} ${g_template_config.extra_links.prev}`;

			const base_link_next = `[[${this.subject} ${this.type} ${this.index + 1}]]`
			this.links.next = `Next:: ${base_link_next} ${g_template_config.extra_links.next}`;
		}

		init_content() {
			let base_content = '';
			if (this.type.toLowerCase() == "lecture") {
				base_content = 
`## Slides
---
[[${this.subject} ${this.type} ${this.index}.pdf]]
![[${this.subject} ${this.type} ${this.index}.pdf]]

## Notes
---
`;
			}
			this.content = base_content + old_content + g_template_config.extra_content;
		}
	}

	// Define templates based on preprocessed data
	let templates = [
		// Each template is a class definition and instantiation, so only one place is changed if new templates are added.
		new BasicNoteTemplate(),
		new SequentialNoteTemplate(),
		new UniversityNoteTemplate(),
	]

	// Choose a template based on modal window
	let choice = await tp.system.suggester(x=>x.name, templates, true, "Choose Note Type");

	// Initialize template and check for errors
	choice.initialize();

	// Postprocessing
	await app.vault.modify(tfile, ""); // remove old content

	return choice;
}

module.exports = my_function;