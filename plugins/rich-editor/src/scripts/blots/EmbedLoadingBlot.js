import { BlockEmbed } from "quill/blots/block";
import { t } from "@core/utility";

export default class EmbedLoadingBlot extends BlockEmbed {

    static blotName = 'loading-embed';
    static className = 'loading-embed';
    static tagName = 'div';

    static create() {
        const node = super.create();
        node.classList.add('embed');
        node.setAttribute('role', 'alert');

        node.innerHTML = `<div class='embedLoader'>
                            <div class='embedLoader-box'>
                                <div class='embedLoader-loader'>
                                    <span class='sr-only'>
                                        ${t('Loading...')}
                                    </span>
                                </div>
                            </div>
                        </div>`;
        return node;
    }

    static value() {
        return;
    }
}
