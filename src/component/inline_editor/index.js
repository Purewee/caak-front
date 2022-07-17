import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

export default class InlineEditor extends InlineEditorBase {}

InlineEditor.builtinPlugins = [Bold, Italic, List, BlockQuote, Link, Alignment];
InlineEditor.defaultConfig = {
  placeholder: 'Тайлбар',
  rows: 2,
  language: 'en',
  toolbar: {
    items: [
      'bold',
      'italic',
      'link',
      '|',
      'alignment:left',
      'alignment:center',
      'alignment:right',
      'alignment:justify',
      '|',
      'blockQuote',
      'bulletedList',
      'numberedList',
    ],
  },
};
