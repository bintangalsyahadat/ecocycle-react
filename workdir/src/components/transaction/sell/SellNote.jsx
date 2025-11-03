import { XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon, CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


export default function SellNote({ sellInfo, onChangePhoto, onChangeNote }) {
    const [note, setNote] = useState(sellInfo.note || "");
    const [photos, setPhotos] = useState(sellInfo.photos || []);
    const [preview, setPreview] = useState(null);

    const handleChangeNote = (e) => {
        setNote(e.target.value);
        onChangeNote(e.target.value);
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setPhotos((prev) => [...prev, ...newPreviews]);
        onChangePhoto(newPreviews);
    };

    const removePhoto = (index) => {
        const updated = photos.filter((_, i) => i !== index);
        setPhotos(updated);
        onChangePhoto(updated);
    };

    return (
        <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tambahkan Foto (opsional)
                </label>
                <label
                    htmlFor="foto-upload"
                    className="flex items-center w-full justify-center gap-2 border rounded-full px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50 transition w-fit"
                >
                    <CameraIcon className="w-4 h-4" />
                    Tambah Foto
                </label>
                <input
                    id="foto-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoChange}
                />

                {photos.length > 0 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                        {photos.map((foto, index) => (
                            <div
                                key={index}
                                className="relative min-w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 group"
                            >
                                <img
                                    src={foto.url}
                                    alt="preview"
                                    className="object-cover w-full h-full cursor-pointer"
                                    onClick={() => setPreview(foto.url)}
                                />
                                <button
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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