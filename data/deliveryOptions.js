import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function getDeliveryOption (deliveryOptionId) {
    let deliveryOption;
        
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            };
        });
    
    return deliveryOption || deliveryOptions[0];
}

function isWeekend(day) {
    return day.format('dddd') === 'Saturday' || day.format('dddd') === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
    let deliveryTime = deliveryOption.deliveryTime;
    let deliveryDate = dayjs();

    while (deliveryTime > 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        
        if(!isWeekend(deliveryDate)) {
            deliveryTime--;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}

export function checkDeliveryOption(deliveryOptionId) {
    let deliveryOption = false;

    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId)
            deliveryOption = true;
    })

    return deliveryOption;
};

export const deliveryOptions = [
    {
        id: '1',
        deliveryTime: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryTime: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryTime: 1,
        priceCents: 999
    }
];