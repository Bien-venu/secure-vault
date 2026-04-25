const Table = ({ tableFiles }) => {
  return (
    <div className="flex h-fit w-full flex-col gap-2 ">
      <h2 className="text-white/50">Recent Files</h2>
      <div className="flex h-full w-full overflow-hidden rounded-xl border border-white/10">
        <table className="h-full w-full overflow-hidden text-left">
          <thead>
            <tr className="-b h-12 border-white/20">
              <th className="flex h-full items-center justify-center py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 appearance-none rounded-sm border border-gray-400 checked:border-blue-500 checked:bg-transparent focus:outline-none"
                />
              </th>
              <th className="py-2">File Name</th>
              <th>Size</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {tableFiles.map((file) => {
              const ext = file.name.includes(".")
                ? file.name.split(".").pop()
                : "unknown";

              return (
                <tr
                  key={file.id}
                  className="bg-list hover:bg-active-hover h-12 border-b border-white/10"
                >
                  <td className="flex h-full items-center justify-center py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 appearance-none rounded-sm border border-gray-400 checked:border-blue-500 checked:bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="py-2">{file.name}</td>
                  <td>{file.size}</td>
                  <td>{ext}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
