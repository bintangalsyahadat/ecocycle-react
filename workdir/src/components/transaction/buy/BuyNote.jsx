import { PencilIcon } from "@heroicons/react/24/solid";

export default function BuyNote({ note, onChangeNote }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tambahkan Catatan (opsional)
            </label>

            <div className="flex items-start gap-2">
                <PencilIcon className="text-gray-400 mt-2 ms-1 w-4 h-4" />

                <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => onChangeNote(e.target.value)}
                    placeholder="Tuliskan catatan tambahan di sini..."
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm
                               text-gray-700 focus:outline-none focus:ring-2
                               focus:ring-(--main-color-hover)"
                />
            </div>
        </div>
    );
}
