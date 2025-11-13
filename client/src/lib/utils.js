import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
// ... keep your existing cn() function

/**
 * Flattens a nested hierarchy (from our API) into a flat array
 * that BALKAN OrgChartJS can understand (id/pid format).
 */
export function flattenHierarchy(nestedArray) {
    const flatNodes = [];

    // Recursive function to traverse the tree
    const traverse = (nodes, parentId = null) => {
        if (!nodes || nodes.length === 0) {
            return;
        }

        nodes.forEach(node => {
            // Add the current node to the flat list
            flatNodes.push({
                id: node._id,       // Use the MongoDB _id as the unique ID
                pid: parentId,    // Link to the parent's ID
                name: node.name,
                role: node.role,
                department: node.department,
                photoUrl: node.photoUrl, // We can bind this later
            });

            // Recursively traverse children
            traverse(node.children, node._id);
        });
    };

    // Start the traversal from the root nodes
    traverse(nestedArray, null);

    return flatNodes;
}