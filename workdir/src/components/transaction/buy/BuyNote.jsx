import { XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon} from "@heroicons/react/24/solid";
import { useState } from "react";


export default function BuyNote({ buyInfo,onChangeNote }) {
    const [note, setNote] = useState(buyInfo.note || "");
    const [preview, setPreview] = useState(null);

    const handleChangeNote = (e) => {
        setNote(e.target.value);
        onChangeNote(e.target.value);
    };

    return (
        <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tambahkan Catatan (opsional)
                </label>
                <div className="flex items-start gap-2">
                    <PencilIcon
                        className="text-gray-400 mt-2 ms-1 w-4 h-4"
                    />
                    <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => handleChangeNote(e)}
                        placeholder="Tuliskan catatan tambahan di sini..."
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-(--main-color-hover)"
                    />
                </div>
            </div>

            {preview && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-2xl p-3 max-w-3xl w-[90%]">
                        <button
                            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                            onClick={() => setPreview(null)}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <img
                            src={preview}
                            alt="preview besar"
                            className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    )
}