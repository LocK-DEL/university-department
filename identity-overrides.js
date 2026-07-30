(() => {
    "use strict";

    const replacements = [
        ["3501391833@qq.com", "liuwenlong0706@outlook.com"],
        ["BTC多周期行情分析与风控报告系统", "多周期行情分析与风控报告金融交易系统"],
        ["BTC分析系统", "金融交易系统"]
    ];

    function replaceValue(value) {
        if (!value) return value;
        return replacements.reduce(
            (result, [from, to]) => result.split(from).join(to),
            value
        );
    }

    function updateTextNodes(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach((node) => {
            const parentName = node.parentElement?.tagName;
            if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parentName)) return;
            const nextValue = replaceValue(node.nodeValue);
            if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
        });
    }

    function updateAttributes(root) {
        root.querySelectorAll("[href], [aria-label], [title], meta[content]").forEach((element) => {
            for (const attribute of ["href", "aria-label", "title", "content"]) {
                if (!element.hasAttribute(attribute)) continue;
                const current = element.getAttribute(attribute);
                const next = replaceValue(current);
                if (next !== current) element.setAttribute(attribute, next);
            }
        });
    }

    function applyRequestedIdentityUpdates() {
        document.title = replaceValue(document.title);
        updateTextNodes(document.documentElement);
        updateAttributes(document.documentElement);
    }

    applyRequestedIdentityUpdates();
})();
