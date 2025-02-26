"use client";

import { addBuyer } from "../lib/addBuyer";

export default function TestPage() {
	const handleAddBuyer = async () => {
		const success = await addBuyer("67bd6d6387039dd6fe578b11", "user@example.com", "Premium", new Date());

		const today = new Date();
		const previousDay = new Date();
		previousDay.setDate(today.getDate() - 2); // Previous day

		const nextDay = new Date();
		nextDay.setDate(today.getDate() + 5); // Next day

		await addBuyer("67bd6d6387039dd6fe578b11", "user@example.com", "Premium", previousDay);
		await addBuyer("67bd6d6387039dd6fe578b11", "user@example.com", "Premium", nextDay);

		if (success) {
			console.log("Buyer added successfully!");
		} else {
			console.log("Failed to add buyer.");
		}
	};


	return (
		<div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
			<button onClick={() => {
				handleAddBuyer();
			}}>
				click mee 👩‍🍳
			</button>
		</div>
	);
}
