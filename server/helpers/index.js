/*
 * Extract the supplier id from the metadata
 * Parse a string into json, or read the object
 */
export const getSupplierId = (metadata) => {
	let supplier_id = null;
	if (metadata && typeof metadata === 'object') {
		supplier_id = metadata.supplier_id;

	// Temporary as I entered some test data that was imperfect and dont know how to delete
	} else {
		try {
			const substring = metadata.substring(1, metadata.length - 1);
			supplier_id = JSON.parse(substring).supplier_id;
		} catch (e) {
			// TODO: if for some reason an item doesnt have a supplier id....
			// This is bad, this should never theoretically happen.
			supplier_id = null;
		}
	}

	return supplier_id;
}


/*
 * Given a an array of item objects [{}, {}]
 * Return a hashed index of items based on suppler id --> {	1: [{}, {}], 2: [{}] }
 */
export const sortItemsBySupplier = (items) => {
	const itemsSortedBySupplier = {};
	for (let i=0; i<items.length; i++) {
		const metadata = items[i].metadata;
		const supplierId = getSupplierId(metadata);
		if (itemsSortedBySupplier[supplierId]) {
			itemsSortedBySupplier[supplierId] = [ ...itemsSortedBySupplier[supplierId], items[i] ]
		} else {
			itemsSortedBySupplier[supplierId] = [items[i]];
		}
	}

	return itemsSortedBySupplier;
}
