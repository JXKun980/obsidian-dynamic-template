---
<%* 
g_template = await tp.user.universal_template(tp);
g_template_config.reset();
-%>
type: note 
date created: <% tp.file.creation_date() %>
status: colony
---

**Description**:: *<% tp.file.title %>*
**Tags**:: <% g_template.tags %>

---
<% g_template.content %>

# Footnote
---
Last Modified:: `=this.file.mtime`
<% g_template.links.up %>
<% g_template.links.down %>
<% g_template.links.prev %>
<% g_template.links.next %>
<% g_template.links.same %>