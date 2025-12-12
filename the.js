function calculateAndAlert() {
    let inputElementOld = document.getElementById('inputNumber');
    let old_reading = inputElementOld.value;
    let inputElementNew = document.getElementById('inputNumber1');
    let new_reading = inputElementNew.value;

    function fai1(newVal, oldVal) {
        return parseFloat(newVal) - parseFloat(oldVal);
    }

    let unitsUsed = fai1(new_reading, old_reading);
    let totalCost = 0; 
    let remainingUnits = unitsUsed;

    if (isNaN(unitsUsed) || unitsUsed < 0) {
        document.getElementById('unitsUsedDisplay').innerText = "ການປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!";
        document.getElementById('rateDisplay').innerHTML = "<strong>ກະລຸນາປ້ອນຄ່າທີ່ຖືກຕ້ອງ</strong>";
        return;
    }

    // --- ການຄິດໄລ່ລາຄາຊັ້ນທີ່ຖືກແກ້ໄຂໃຫ້ກົງກັບໃບເກັບເງິນ ---
    
    // Tier 1: 0 - 25 (25 ຫົວໜ່ວຍ) @ 679
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 25);
        totalCost += unitsInTier * 679;
        remainingUnits -= unitsInTier;
    } 

    // Tier 2: 26 - 150 (125 ຫົວໜ່ວຍ) @ 756
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 125); // ປ່ຽນຈາກ 150 ເປັນ 125
        totalCost += unitsInTier * 756;
        remainingUnits -= unitsInTier;
    }
    
    // Tier 3: 151 - 300 (150 ຫົວໜ່ວຍ) @ 1207
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 150); // ປ່ຽນຈາກ 300 ເປັນ 150
        totalCost += unitsInTier * 1207;
        remainingUnits -= unitsInTier;
    }

    // Tier 4: 301 - 400 (100 ຫົວໜ່ວຍ) @ 1303
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 100); // ປ່ຽນຈາກ 400 ເປັນ 100
        totalCost += unitsInTier * 1303;
        remainingUnits -= unitsInTier;
    }

    // Tier 5: 401 - 500 (100 ຫົວໜ່ວຍ) @ 1402
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 100); // ປ່ຽນຈາກ 500 ເປັນ 100
        totalCost += unitsInTier * 1402;
        remainingUnits -= unitsInTier;
    }

    // Tier 6: 501 - 1000 (500 ຫົວໜ່ວຍ) @ 1442
    // ຂໍ້ສັງເກດ: ໃນໃບເກັບເງິນສະແດງພຽງ 201 ຫົວໜ່ວຍ (ສຳລັບຫົວໜ່ວຍທີ່ໃຊ້ 701)
    // ແຕ່ຖ້າຈະຄິດໄລ່ສູງສຸດແມ່ນ: 1000 - 500 = 500 ຫົວໜ່ວຍ
    // ແຕ່ເພື່ອໃຫ້ກົງກັບຄ່າທີ່ໃຊ້ 701 (500 + 201) ຂໍໃສ່ 500 ເປັນຂີດຈຳກັດສູງສຸດຂອງຊັ້ນ.
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 500); // ປ່ຽນຈາກ 1000 ເປັນ 500
        totalCost += unitsInTier * 1442;
        remainingUnits -= unitsInTier;
    }
    
    // Tier 7: 1001 - 1500 (500 ຫົວໜ່ວຍ) @ 1500
    if (remainingUnits > 0) {
        let unitsInTier = Math.min(remainingUnits, 500); // ປ່ຽນຈາກ 1500 ເປັນ 500
        totalCost += unitsInTier * 1500;
        remainingUnits -= unitsInTier;
    }

    // Tier 8: >= 1501 (ຫົວໜ່ວຍທີ່ເຫຼືອ) @ 1562
    if (remainingUnits >= 0) {
        // ໃຊ້ຄ່າ 5000 ເປັນຄ່າສູງສຸດຂອງຊັ້ນສຸດທ້າຍ, ຍ້ອນວ່າໃນໃບເກັບເງິນບໍ່ມີຂີດຈຳກັດທີ່ຊັດເຈນ.
        let unitsInTier = remainingUnits; // ບໍ່ມີ Math.min ເພື່ອໃຫ້ກວມເອົາຫົວໜ່ວຍທີ່ເຫຼືອທັງໝົດ
        totalCost += unitsInTier * 1562; // ລາຄາ 1,562 ກີບ
    }
    // --- ສິ້ນສຸດການຄິດໄລ່ລາຄາຊັ້ນທີ່ຖືກແກ້ໄຂ ---

    // **ສຳຄັນ:** ເພີ່ມຄ່າບຳລຸງຮັກສາ/ຄ່າບໍລິການຄົງທີ່ (17,700 ກີບ)
    const SERVICE_CHARGE = 17700;
    totalCost += SERVICE_CHARGE;

    // ຄິດໄລ່ VAT ແລະຍອດຈ່າຍສຸດທິ
    const VAT_RATE = 0.10; // 10%
    let vatAmount = totalCost * VAT_RATE;
    let finalAmountDue = totalCost + vatAmount;

    // ຈັດຮູບແບບ ແລະ ສະແດງຜົນ
    document.getElementById('unitsUsedDisplay').innerText = unitsUsed.toFixed(2) + " ຫົວໜ່ວຍ";

    let formattedTotalDue = finalAmountDue.toLocaleString('lo-LA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    let formattedCostBeforeVat = totalCost.toLocaleString('lo-LA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    let formattedVatAmount = vatAmount.toLocaleString('lo-LA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    document.getElementById('rateDisplay').innerHTML = 
        `ຄ່າໄຟຟ້າ (ລວມຄ່າບໍລິການ): ${formattedCostBeforeVat} ກີບ<br>` +
        `ອາກອນມູນຄ່າເພີ່ມ (10%): ${formattedVatAmount} ກີບ<br>` +
        `<strong>ຍອດຈ່າຍສຸດທິ: ${formattedTotalDue} ກີບ</strong>`;
}