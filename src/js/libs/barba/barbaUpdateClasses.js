export default function barbaUpdateClasses(html) {
    const matches = html.match(/<body.+?class="([^""]*)"/i);
    document.body.setAttribute("class", (matches && matches.at(1)) ?? "");
}
