import type { ExplorerItem } from "../data/folderData";

export default function useTraverseTree() {
  function insertNode(
    tree: ExplorerItem,
    folderId: string,
    item: string,
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      const newItem: ExplorerItem = {
        id: new Date().getTime().toString(),
        name: item,
        isFolder,
        items: [],
      };

      return {
        ...tree,
        items: [newItem, ...tree.items],
      };
    }

    let latestNode: ExplorerItem[];

    latestNode = tree.items.map((node) =>
      insertNode(node, folderId, item, isFolder)
    );

    return { ...tree, items: latestNode };
  }

  return { insertNode };
}
