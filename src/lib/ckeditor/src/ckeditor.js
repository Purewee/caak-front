/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting.js';

class Editor extends InlineEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Alignment,
  SourceEditing,
  Autoformat,
  BlockQuote,
  Bold,
  Heading,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
  TextTransformation,
  Essentials,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'blockQuote',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',

      '|',
      'link',
      'insertTable',
      'undo',
      'redo',
      'sourceEditing',
    ],
  },
  language: 'en',
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

export default Editor;
