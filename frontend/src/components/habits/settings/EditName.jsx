function EditName({ name, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
            </label>
            <input type="text" value={name} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}

export default EditName;
