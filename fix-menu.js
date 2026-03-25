const initialMenu = [
    { day: "Monday", breakfast: "Idly, Vada, Chutney", lunch: "Rice, Dal, Veg Curry, Curd", snacks: "Samosa, Tea", dinner: "Chapati, Paneer Curry, Rice" },
    { day: "Tuesday", breakfast: "Puri, Bhaji", lunch: "Veg Biryani, Raitha", snacks: "Biscuits, Coffee", dinner: "Rice, Rasam, Fry, Curd" },
    { day: "Wednesday", breakfast: "Upma, Ginger Chutney", lunch: "Rice, Sambar, Seasonal Veg", snacks: "Pakora, Tea", dinner: "Dosa, Chutney, Sambhar" },
    { day: "Thursday", breakfast: "Poha, Sev", lunch: "Jeera Rice, Dal Tadka", snacks: "Fruit, Milk", dinner: "Roti, Mixed Veg Curry" },
    { day: "Friday", breakfast: "Bread, Omelette/Jam", lunch: "Egg Curry, Rice, Dal", snacks: "Mirchi Bajji, Tea", dinner: "Chicken Biryani / Veg Pulao" },
    { day: "Saturday", breakfast: "Masala Dosa", lunch: "Lemon Rice, Curd Rice", snacks: "Chips, Coffee", dinner: "Roti, Dal Fry, Rice" },
    { day: "Sunday", breakfast: "Aloo Paratha, Curd", lunch: "Special South Indian Thali", snacks: "Cake/Sweets, Tea", dinner: "Pasta / Fried Rice" }
];

localStorage.setItem('menu', JSON.stringify(initialMenu));
console.log('Menu updated in LocalStorage');
location.reload();
