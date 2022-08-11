
 import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';
import { isWidget } from '@ckeditor/ckeditor5-widget/src/utils';

import { isObject } from 'lodash-es';

export default class SimpleBoxToolbar extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SimpleBoxToolbar';
	}

	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const t = editor.t;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );
	

		widgetToolbarRepository.register( 'simpleBox', {
			ariaLabel: t( 'Clause toolbar' ),
			items: normalizeDeclarativeConfig( editor.config.get( 'toolbar.simpleBoxItems' ) || [] ),
			getRelatedElement: selection => this.getClosestSelectedSimpleBoxWidget( selection )
		} );
	}

	/**
	 * Returns an SimpleBox widget editing view element if one is selected or is among the selection's ancestors.
	 *
	 * @protected
	 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
	 * @returns {module:engine/view/element~Element|null}
	 */
	 getClosestSelectedSimpleBoxWidget( selection ) {
		const viewElement = selection.getSelectedElement();

		if ( viewElement && this.isSimpleBoxWidget( viewElement ) ) {
			return viewElement;
		}

		let parent = selection.getFirstPosition().parent;

		while ( parent ) {
			if ( parent.is( 'element' ) && this.isSimpleBoxWidget( parent ) ) {
				return parent;
			}

			parent = parent.parent;
		}

		return null;
	}

	/**
	 * Checks if a given view element is an SimpleBox widget.
	 *
	 * @protected
	 * @param {module:engine/view/element~Element} viewElement
	 * @returns {Boolean}
	 */
	 isSimpleBoxWidget( viewElement ) {
		return !!viewElement.hasClass( 'simple-box' ) && isWidget( viewElement );
	}


}

function normalizeDeclarativeConfig( config ) {
	return config.map( item => isObject( item ) ? item.name : item );
}
