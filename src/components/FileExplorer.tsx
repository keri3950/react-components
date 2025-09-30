import { useState } from "react";
import { explorer, type ExplorerItem } from "../data/folderData";
import useTraverseTree from "../hooks/useTraversetree";

type FolderOrFileProps = {
  explorerItem: ExplorerItem;
  handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
};

function FolderOrFile({ explorerItem, handleInsertNode }: FolderOrFileProps) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleAddNewItem = (e: React.MouseEvent, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible: true, isFolder });
  };

  const onAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleInsertNode(
        explorerItem.id,
        e.currentTarget.value,
        showInput.isFolder
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorerItem.isFolder) {
    return (
      <div className="py-1">
        <div
          onClick={() => setExpand(!expand)}
          className="flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-200 px-2 py-1 text-left"
        >
          <span className="flex items-center">
            <span className="mr-2">📁</span>
            <span className="font-medium">{explorerItem.name}</span>
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => handleAddNewItem(e, true)}
              className="p-1 opacity-80 hover:opacity-100"
              title="Add Folder"
            >
              📁+
            </button>
            <button
              onClick={(e) => handleAddNewItem(e, false)}
              className="p-1 opacity-80 hover:opacity-100"
              title="Add File"
            >
              📄+
            </button>
          </div>
        </div>

        <div className={`pl-6 ${expand ? "block" : "hidden"}`}>
          {showInput.visible && (
            <div className="flex items-center py-1">
              <span className="mr-2">{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                autoFocus
                onKeyDown={onAddItem}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="flex-grow rounded border border-gray-400 bg-white px-1 py-0.5 text-sm"
              />
            </div>
          )}
          {explorerItem.items.map((item) => (
            <FolderOrFile
              explorerItem={item}
              handleInsertNode={handleInsertNode}
              key={item.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center py-1 pl-8 text-gray-700 dark:text-gray-400">
      <span className="mr-2">📄</span>
      <span>{explorerItem.name}</span>
    </div>
  );
}

export default function FileExplorer() {
  const [explorerData, setExplorerData] = useState<ExplorerItem>(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="w-full">
      <FolderOrFile
        explorerItem={explorerData}
        handleInsertNode={handleInsertNode}
      />
    </div>
  );
}
