<%* 
g_template_config = new class TemplateConfig {
    constructor() {
        this.reset();
        this.str_to_link = x => `[[${x}]]`;
    }

    reset() {
        this.extra_content = "";
        this.extra_tags = [];
        this.extra_links = {
            up: [],
            down: [],
            prev: [],
            next: [],
            same: []
        }
    }

    /**
     * @param {{
     * extra_content: string,
     * extra_tags: Object,
     * extra_links: {
     *    up: Object,
     *    down: Object,
     *    prev: Object,
     *    next: Object,
     *    same: Object
     * }              
     * }} p
     */
    change(p) {
        this.extra_content = p.extra_content;
        this.extra_tags = p.extra_tags.join(" ");
        this.extra_links.up = p.extra_links.up.map(this.str_to_link).join(" ");
        this.extra_links.down = p.extra_links.down.map(this.str_to_link).join(" ");
        this.extra_links.prev = p.extra_links.prev.map(this.str_to_link).join(" ");
        this.extra_links.next = p.extra_links.next.map(this.str_to_link).join(" ");
        this.extra_links.same = p.extra_links.same.map(this.str_to_link).join(" ");
    }
}();
-%> 