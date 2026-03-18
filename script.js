const form = document.getElementById("finance-form");
const htmlEl = document.documentElement;
const incomeFieldsContainer = document.getElementById("income-fields");
const expenseSectionsContainer = document.getElementById("expense-sections");

const languageToggleEl = document.getElementById("language-toggle");
const clearDataButtonEl = document.getElementById("clear-data");
const expandAllButtonEl = document.getElementById("expand-all");
const collapseAllButtonEl = document.getElementById("collapse-all");
const totalIncomeEl = document.getElementById("total-income");
const resultTotalIncomeEl = document.getElementById("result-total-income");
const resultTotalExpensesEl = document.getElementById("result-total-expenses");
const resultRemainingBalanceEl = document.getElementById("result-remaining-balance");
const statusTextEl = document.getElementById("status-text");
const remainingBalanceEl = document.getElementById("remaining-balance");
const housingRatioEl = document.getElementById("housing-ratio");
const carCostsTotalEl = document.getElementById("car-costs-total");
const foodTotalEl = document.getElementById("food-total");
const childrenTotalEl = document.getElementById("children-total");
const vacationTotalEl = document.getElementById("vacation-total");
const warningMessageEl = document.getElementById("warning-message");
const balanceCardEl = document.querySelector(".balance-card");

const languageStorageKey = "smartBaytLanguage";
const financeDataStorageKey = "smartBaytFamilyPlannerData";

const incomeFields = [
  { id: "father-salary", en: "Father monthly salary", ar: "راتب الأب الشهري" },
  { id: "mother-salary", en: "Mother monthly salary", ar: "راتب الأم الشهري" },
  { id: "father-side-income", en: "Father side income", ar: "دخل إضافي للأب" },
  { id: "mother-side-income", en: "Mother side income", ar: "دخل إضافي للأم" },
  { id: "rental-income", en: "Rental income", ar: "دخل الإيجار" },
  { id: "gift-support-income", en: "Gift / support income", ar: "دخل من هدايا أو دعم" },
  { id: "tax-refund", en: "Tax refund", ar: "استرداد الضريبة" },
  { id: "seasonal-income", en: "Seasonal income", ar: "دخل موسمي إضافي" },
  { id: "other-income", en: "Other income", ar: "أي دخل آخر" },
];

const expenseCategories = [
  {
    key: "housing",
    titleEn: "Housing",
    titleAr: "السكن",
    subtitleEn: "Home costs and service bills.",
    subtitleAr: "كل ما يخص السكن وفواتير البيت.",
    fields: [
      { id: "rent-mortgage", en: "Rent or mortgage", ar: "الإيجار أو القرض" },
      { id: "hoa", en: "HOA", ar: "رسوم HOA" },
      { id: "property-tax", en: "Property tax", ar: "ضريبة العقار" },
      { id: "home-insurance", en: "Home insurance", ar: "تأمين المنزل" },
      { id: "electricity", en: "Electricity", ar: "الكهرباء" },
      { id: "gas", en: "Gas", ar: "الغاز" },
      { id: "water", en: "Water", ar: "الماء" },
      { id: "internet", en: "Internet", ar: "الإنترنت" },
      { id: "phone", en: "Phone", ar: "الهاتف" },
      { id: "home-maintenance", en: "Home maintenance", ar: "صيانة المنزل" },
      { id: "furniture", en: "Furniture", ar: "الأثاث" },
      { id: "household-supplies", en: "Household supplies", ar: "مستلزمات المنزل" },
      { id: "cleaning-supplies", en: "Cleaning supplies", ar: "مواد التنظيف" },
      { id: "trash-service-fees", en: "Trash / service fees", ar: "رسوم القمامة / الخدمات" },
      { id: "moving-expenses", en: "Moving expenses", ar: "مصاريف الانتقال" },
    ],
  },
  {
    key: "food",
    titleEn: "Food and groceries",
    titleAr: "الطعام والبقالة",
    subtitleEn: "Daily food, drinks, and kitchen basics.",
    subtitleAr: "مشتريات الأكل اليومية ومستلزمات المطبخ.",
    fields: [
      { id: "vegetables", en: "Vegetables", ar: "الخضروات" },
      { id: "fruits", en: "Fruits", ar: "الفواكه" },
      { id: "meat", en: "Meat", ar: "اللحوم" },
      { id: "chicken", en: "Chicken", ar: "الدجاج" },
      { id: "fish", en: "Fish", ar: "السمك" },
      { id: "milk", en: "Milk", ar: "الحليب" },
      { id: "bread", en: "Bread", ar: "الخبز" },
      { id: "rice-pasta", en: "Rice / pasta", ar: "الأرز والمعكرونة" },
      { id: "breakfast-items", en: "Breakfast items", ar: "مستلزمات الفطور" },
      { id: "snacks", en: "Snacks", ar: "الوجبات الخفيفة" },
      { id: "water-bottles", en: "Water", ar: "الماء" },
      { id: "juice", en: "Juice", ar: "العصير" },
      { id: "eating-out", en: "Eating out", ar: "الأكل خارج المنزل" },
      { id: "coffee", en: "Coffee", ar: "القهوة" },
      { id: "sweets", en: "Sweets", ar: "الحلويات" },
      { id: "kitchen-supplies", en: "Kitchen supplies", ar: "مستلزمات المطبخ" },
    ],
  },
  {
    key: "clothing",
    titleEn: "Clothing",
    titleAr: "الملابس",
    subtitleEn: "Clothes and seasonal needs for the family.",
    subtitleAr: "ملابس العائلة واحتياجات المواسم.",
    fields: [
      { id: "father-clothing", en: "Father clothing", ar: "ملابس الأب" },
      { id: "mother-clothing", en: "Mother clothing", ar: "ملابس الأم" },
      { id: "child-1-clothing", en: "Child 1 clothing", ar: "ملابس الطفل 1" },
      { id: "child-2-clothing", en: "Child 2 clothing", ar: "ملابس الطفل 2" },
      { id: "child-3-clothing", en: "Child 3 clothing", ar: "ملابس الطفل 3" },
      { id: "shoes", en: "Shoes", ar: "الأحذية" },
      { id: "coats", en: "Coats", ar: "المعاطف" },
      { id: "seasonal-clothes", en: "Seasonal clothes", ar: "ملابس موسمية" },
      { id: "school-bags", en: "School bags", ar: "الحقائب المدرسية" },
      { id: "accessories", en: "Accessories", ar: "الإكسسوارات" },
    ],
  },
  {
    key: "children-school",
    titleEn: "Children and school",
    titleAr: "الأطفال والمدرسة",
    subtitleEn: "Education, activities, and child-related needs.",
    subtitleAr: "مصاريف الدراسة واحتياجات الأطفال والأنشطة.",
    fields: [
      { id: "school-fees", en: "School fees", ar: "الرسوم المدرسية" },
      { id: "school-supplies", en: "School supplies", ar: "المستلزمات المدرسية" },
      { id: "books", en: "Books", ar: "الكتب" },
      { id: "devices-tablet", en: "Devices / tablet", ar: "الأجهزة أو التابلت" },
      { id: "school-transportation", en: "School transportation", ar: "مواصلات المدرسة" },
      { id: "school-meals", en: "School meals", ar: "وجبات المدرسة" },
      { id: "activities", en: "Activities", ar: "الأنشطة" },
      { id: "school-trips", en: "School trips", ar: "الرحلات المدرسية" },
      { id: "childcare-after-school", en: "Childcare / after school", ar: "رعاية الأطفال أو ما بعد المدرسة" },
      { id: "tutoring", en: "Tutoring", ar: "الدروس الخصوصية" },
      { id: "sports-clothes", en: "Sports clothes", ar: "ملابس الرياضة" },
      { id: "birthday-expenses", en: "Birthday expenses", ar: "مصاريف أعياد الميلاد" },
    ],
  },
  {
    key: "health",
    titleEn: "Health",
    titleAr: "الصحة",
    subtitleEn: "Insurance, checkups, and medical care.",
    subtitleAr: "التأمين والعلاج والمراجعات الطبية.",
    fields: [
      { id: "health-insurance", en: "Health insurance", ar: "التأمين الصحي" },
      { id: "medicine", en: "Medicine", ar: "الأدوية" },
      { id: "doctor-visits", en: "Doctor visits", ar: "زيارات الطبيب" },
      { id: "dental", en: "Dental", ar: "الأسنان" },
      { id: "glasses", en: "Glasses", ar: "النظارات" },
      { id: "physical-therapy", en: "Physical therapy", ar: "العلاج الطبيعي" },
      { id: "emergency", en: "Emergency", ar: "الطوارئ" },
      { id: "vitamins", en: "Vitamins", ar: "الفيتامينات" },
      { id: "other-health-expenses", en: "Other health expenses", ar: "أي مصاريف صحية أخرى" },
    ],
  },
  {
    key: "car-1",
    titleEn: "Car 1",
    titleAr: "السيارة 1",
    subtitleEn: "Running costs for the first car.",
    subtitleAr: "كل مصاريف السيارة الأولى.",
    fields: [
      { id: "car-1-fuel", en: "Car 1 fuel", ar: "وقود السيارة 1" },
      { id: "car-1-insurance", en: "Car 1 insurance", ar: "تأمين السيارة 1" },
      { id: "car-1-payment", en: "Car 1 payment", ar: "قسط السيارة 1" },
      { id: "car-1-maintenance", en: "Car 1 maintenance", ar: "صيانة السيارة 1" },
      { id: "car-1-oil-change", en: "Car 1 oil change", ar: "تغيير زيت السيارة 1" },
      { id: "car-1-tires", en: "Car 1 tires", ar: "إطارات السيارة 1" },
      { id: "car-1-registration", en: "Car 1 registration", ar: "تسجيل السيارة 1" },
      { id: "car-1-parking-tolls", en: "Car 1 parking / tolls", ar: "مواقف ورسوم الطريق للسيارة 1" },
      { id: "car-1-wash", en: "Car 1 wash", ar: "غسيل السيارة 1" },
    ],
  },
  {
    key: "car-2",
    titleEn: "Car 2",
    titleAr: "السيارة 2",
    subtitleEn: "Running costs for the second car.",
    subtitleAr: "كل مصاريف السيارة الثانية.",
    fields: [
      { id: "car-2-fuel", en: "Car 2 fuel", ar: "وقود السيارة 2" },
      { id: "car-2-insurance", en: "Car 2 insurance", ar: "تأمين السيارة 2" },
      { id: "car-2-payment", en: "Car 2 payment", ar: "قسط السيارة 2" },
      { id: "car-2-maintenance", en: "Car 2 maintenance", ar: "صيانة السيارة 2" },
      { id: "car-2-oil-change", en: "Car 2 oil change", ar: "تغيير زيت السيارة 2" },
      { id: "car-2-tires", en: "Car 2 tires", ar: "إطارات السيارة 2" },
      { id: "car-2-registration", en: "Car 2 registration", ar: "تسجيل السيارة 2" },
      { id: "car-2-parking-tolls", en: "Car 2 parking / tolls", ar: "مواقف ورسوم الطريق للسيارة 2" },
      { id: "car-2-wash", en: "Car 2 wash", ar: "غسيل السيارة 2" },
    ],
  },
  {
    key: "general-living",
    titleEn: "General living",
    titleAr: "المعيشة العامة",
    subtitleEn: "Shared daily living and transfer expenses.",
    subtitleAr: "المصاريف اليومية العامة والتحويلات العائلية.",
    fields: [
      { id: "mobile-phones", en: "Mobile phones", ar: "هواتف الجوال" },
      { id: "subscriptions", en: "Subscriptions", ar: "الاشتراكات" },
      { id: "streaming-apps", en: "Streaming / apps", ar: "اشتراكات البث والتطبيقات" },
      { id: "father-personal-expenses", en: "Father personal expenses", ar: "المصاريف الشخصية للأب" },
      { id: "mother-personal-expenses", en: "Mother personal expenses", ar: "المصاريف الشخصية للأم" },
      { id: "gifts", en: "Gifts", ar: "الهدايا" },
      { id: "charity", en: "Charity", ar: "الصدقة" },
      { id: "zakat", en: "Zakat", ar: "الزكاة" },
      { id: "family-support-transfers", en: "Family support transfers", ar: "تحويلات دعم للأهل أو الأسرة" },
      { id: "bank-fees", en: "Bank fees", ar: "الرسوم البنكية" },
      { id: "printing-paperwork", en: "Printing / paperwork", ar: "الطباعة / الأوراق" },
      { id: "other-expenses", en: "Other expenses", ar: "مصاريف أخرى" },
    ],
  },
  {
    key: "entertainment-holidays",
    titleEn: "Entertainment and holidays",
    titleAr: "الترفيه والعطلات",
    subtitleEn: "Travel, outings, and seasonal family spending.",
    subtitleAr: "السفر والخروجات والمناسبات العائلية الموسمية.",
    fields: [
      { id: "vacation-travel", en: "Vacation / travel", ar: "الإجازة / السفر" },
      { id: "hotels", en: "Hotels", ar: "الفنادق" },
      { id: "tickets", en: "Tickets", ar: "التذاكر" },
      { id: "travel-food", en: "Travel food", ar: "طعام السفر" },
      { id: "children-entertainment", en: "Children entertainment", ar: "ترفيه الأطفال" },
      { id: "park-beach-activities", en: "Park / beach / activities", ar: "الحدائق أو البحر أو الأنشطة" },
      { id: "gym-sports-subscriptions", en: "Gym / sports subscriptions", ar: "اشتراكات الجيم / الرياضة" },
      { id: "holiday-gifts", en: "Holiday gifts", ar: "هدايا العطلات" },
      { id: "eid-expenses", en: "Eid expenses", ar: "مصاريف العيد" },
      { id: "back-to-school-season", en: "Back to school season", ar: "مصاريف العودة للمدرسة" },
      { id: "summer-expenses", en: "Summer expenses", ar: "مصاريف الصيف" },
    ],
  },
  {
    key: "savings",
    titleEn: "Savings",
    titleAr: "الادخار",
    subtitleEn: "Set aside money for the future.",
    subtitleAr: "مبالغ نحتفظ بها للأهداف المستقبلية.",
    fields: [
      { id: "emergency-savings", en: "Emergency savings", ar: "ادخار الطوارئ" },
      { id: "house-savings", en: "House savings", ar: "ادخار المنزل" },
      { id: "travel-savings", en: "Travel savings", ar: "ادخار السفر" },
      { id: "children-savings", en: "Children savings", ar: "ادخار الأطفال" },
      { id: "general-savings", en: "General savings", ar: "ادخار عام" },
    ],
  },
];

const translations = {
  en: {
    eyebrow: "Smart Bayt",
    brandTitle: "Smart Bayt – Home Finance Made Simple",
    subtitle: "Plan a detailed family budget for a household of five with two cars, all in one simple view.",
    incomeSection: "Income",
    incomeSectionSubtitle: "Add every monthly income source for the family.",
    totalIncome: "Total income",
    totalExpenses: "Total expenses",
    remainingBalance: "Remaining balance",
    status: "Status",
    comfortable: "Comfortable",
    manageable: "Manageable",
    warning: "Warning",
    warningMessage: "Your family expenses are higher than your total monthly income.",
    housingRatio: "Housing ratio",
    carCostsTotal: "Car costs total",
    foodTotal: "Food total",
    childrenTotal: "Children total",
    vacationTotal: "Vacation total",
    expenseChart: "Expense summary",
    chartSubtitle: "Compare the biggest budget groups at a glance.",
    housingChart: "Housing",
    foodChart: "Food",
    carsChart: "Cars",
    childrenChart: "Children",
    clearData: "Clear Data",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    expandSection: "Expand",
    collapseSection: "Collapse",
    toggle: "العربية",
  },
  ar: {
    eyebrow: "سمارت بيت",
    brandTitle: "سمارت بيت – إدارة مالية منزلية بسيطة",
    subtitle: "نظّم ميزانية الأسرة بشكل واضح ومفصل لعائلة من خمسة أفراد مع سيارتين.",
    incomeSection: "الدخل",
    incomeSectionSubtitle: "أدخل جميع مصادر الدخل الشهرية للأسرة.",
    totalIncome: "إجمالي الدخل",
    totalExpenses: "إجمالي المصاريف",
    remainingBalance: "المبلغ المتبقي",
    status: "الحالة",
    comfortable: "مريح",
    manageable: "مقبول",
    warning: "خطر",
    warningMessage: "إجمالي مصاريف الأسرة أعلى من إجمالي الدخل الشهري.",
    housingRatio: "نسبة السكن",
    carCostsTotal: "إجمالي السيارات",
    foodTotal: "إجمالي الطعام",
    childrenTotal: "إجمالي الأطفال",
    vacationTotal: "إجمالي الإجازات",
    expenseChart: "ملخص المصاريف",
    chartSubtitle: "شاهد أكبر بنود الصرف في الميزانية بشكل سريع وواضح.",
    housingChart: "السكن",
    foodChart: "الطعام",
    carsChart: "السيارات",
    childrenChart: "الأطفال",
    clearData: "مسح البيانات",
    expandAll: "فتح الكل",
    collapseAll: "إغلاق الكل",
    expandSection: "فتح",
    collapseSection: "إغلاق",
    toggle: "English",
  },
};

const expenseInputsMap = new Map();
let incomeInputElements = [];
let expenseInputElements = [];
let translatableEls = [];
let currentLanguage = "en";

function renderField(field) {
  return `
    <label class="field">
      <span data-field-label="${field.id}">${field.en}</span>
      <input type="number" id="${field.id}" min="0" step="0.01" placeholder="0.00">
    </label>
  `;
}

function renderIncomeFields() {
  incomeFieldsContainer.innerHTML = incomeFields.map(renderField).join("");
  incomeInputElements = incomeFields.map((field) => document.getElementById(field.id));
}

function renderExpenseSections() {
  expenseSectionsContainer.innerHTML = expenseCategories
    .map((category) => {
      return `
        <details class="section-card" open data-category="${category.key}" data-section-card>
          <summary class="section-summary">
            <div>
              <h2 data-category-title="${category.key}">${category.titleEn}</h2>
              <p data-category-subtitle="${category.key}">${category.subtitleEn}</p>
            </div>
            <span class="section-toggle-text" data-i18n-toggle="${category.key}">Collapse</span>
          </summary>

          <div class="field-grid">
            ${category.fields.map(renderField).join("")}
          </div>

          <div class="summary-row">
            <span data-category-total-label="${category.key}">${category.titleEn} total</span>
            <strong id="${category.key}-total">$0.00</strong>
          </div>
        </details>
      `;
    })
    .join("");

  expenseInputElements = expenseCategories.flatMap((category) => {
    return category.fields.map((field) => {
      const input = document.getElementById(field.id);
      expenseInputsMap.set(field.id, input);
      return input;
    });
  });
}

function collectTranslatableElements() {
  translatableEls = [...document.querySelectorAll("[data-i18n]")];
}

function updateSectionToggleLabels() {
  const languageSet = translations[currentLanguage];
  const sectionCards = document.querySelectorAll("[data-section-card]");

  sectionCards.forEach((card) => {
    const toggleLabel = card.querySelector(".section-toggle-text");
    if (toggleLabel) {
      toggleLabel.textContent = card.open ? languageSet.collapseSection : languageSet.expandSection;
    }
  });
}

function getFieldConfigById(id) {
  return (
    incomeFields.find((field) => field.id === id) ||
    expenseCategories.flatMap((category) => category.fields).find((field) => field.id === id)
  );
}

function getValue(input) {
  const parsed = parseFloat(input.value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sumInputs(inputs) {
  return inputs.reduce((sum, input) => sum + getValue(input), 0);
}

function getCategoryTotal(categoryKey) {
  const category = expenseCategories.find((item) => item.key === categoryKey);
  const inputs = category.fields.map((field) => expenseInputsMap.get(field.id));
  return sumInputs(inputs);
}

function formatCurrency(value) {
  const locale = currentLanguage === "ar" ? "ar" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value) {
  const locale = currentLanguage === "ar" ? "ar" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}

function getStatusKey(totalIncome, remainingBalance) {
  if (remainingBalance < 0) {
    return "warning";
  }

  if (totalIncome === 0) {
    return "manageable";
  }

  if (remainingBalance <= totalIncome * 0.2) {
    return "manageable";
  }

  return "comfortable";
}

function updateStaticTranslations() {
  const languageSet = translations[currentLanguage];

  translatableEls.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = languageSet[key];
  });

  incomeFields.forEach((field) => {
    const element = document.querySelector(`[data-field-label="${field.id}"]`);
    if (element) {
      element.textContent = currentLanguage === "ar" ? field.ar : field.en;
    }
  });

  expenseCategories.forEach((category) => {
    const titleEl = document.querySelector(`[data-category-title="${category.key}"]`);
    const subtitleEl = document.querySelector(`[data-category-subtitle="${category.key}"]`);
    const totalLabelEl = document.querySelector(`[data-category-total-label="${category.key}"]`);
    const categoryTitle = currentLanguage === "ar" ? category.titleAr : category.titleEn;
    const categorySubtitle = currentLanguage === "ar" ? category.subtitleAr : category.subtitleEn;

    if (titleEl) {
      titleEl.textContent = categoryTitle;
    }

    if (subtitleEl) {
      subtitleEl.textContent = categorySubtitle;
    }

    if (totalLabelEl) {
      totalLabelEl.textContent = `${categoryTitle} ${currentLanguage === "ar" ? "الإجمالي" : "total"}`;
    }

    category.fields.forEach((field) => {
      const labelEl = document.querySelector(`[data-field-label="${field.id}"]`);
      if (labelEl) {
        labelEl.textContent = currentLanguage === "ar" ? field.ar : field.en;
      }
    });
  });

  updateSectionToggleLabels();
}

function applyLanguage(language) {
  currentLanguage = language;
  htmlEl.lang = language;
  htmlEl.dir = language === "ar" ? "rtl" : "ltr";
  updateStaticTranslations();
  languageToggleEl.textContent = translations[language].toggle;
  localStorage.setItem(languageStorageKey, language);
}

function saveFormData() {
  const allInputs = [...incomeInputElements, ...expenseInputElements];
  const formData = {};

  allInputs.forEach((input) => {
    formData[input.id] = input.value;
  });

  localStorage.setItem(financeDataStorageKey, JSON.stringify(formData));
}

function restoreFormData() {
  const savedData = localStorage.getItem(financeDataStorageKey);

  if (!savedData) {
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);
    [...incomeInputElements, ...expenseInputElements].forEach((input) => {
      if (typeof parsedData[input.id] === "string") {
        input.value = parsedData[input.id];
      }
    });
  } catch (error) {
    localStorage.removeItem(financeDataStorageKey);
  }
}

function clearFormData() {
  [...incomeInputElements, ...expenseInputElements].forEach((input) => {
    input.value = "";
  });

  localStorage.removeItem(financeDataStorageKey);
}

function updateCategoryTotals() {
  expenseCategories.forEach((category) => {
    const total = getCategoryTotal(category.key);
    const totalEl = document.getElementById(`${category.key}-total`);
    if (totalEl) {
      totalEl.textContent = formatCurrency(total);
    }
  });
}

function updateChart(groupTotals) {
  const chartConfig = {
    housing: {
      value: groupTotals.housing,
      valueEl: document.getElementById("chart-housing-value"),
      barEl: document.getElementById("chart-housing-bar"),
    },
    food: {
      value: groupTotals.food,
      valueEl: document.getElementById("chart-food-value"),
      barEl: document.getElementById("chart-food-bar"),
    },
    cars: {
      value: groupTotals.cars,
      valueEl: document.getElementById("chart-cars-value"),
      barEl: document.getElementById("chart-cars-bar"),
    },
    children: {
      value: groupTotals.children,
      valueEl: document.getElementById("chart-children-value"),
      barEl: document.getElementById("chart-children-bar"),
    },
  };

  const maxValue = Math.max(...Object.values(chartConfig).map((item) => item.value), 0);

  Object.values(chartConfig).forEach((item) => {
    const widthPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
    item.valueEl.textContent = formatCurrency(item.value);
    item.barEl.style.width = `${widthPercent}%`;
  });
}

function updateFinanceSummary() {
  const totalIncome = sumInputs(incomeInputElements);
  const totalExpenses = sumInputs(expenseInputElements);
  const remainingBalance = totalIncome - totalExpenses;
  const housingTotal = getCategoryTotal("housing");
  const carCostsTotal = getCategoryTotal("car-1") + getCategoryTotal("car-2");
  const foodTotal = getCategoryTotal("food");
  const childrenClothingTotal =
    getValue(expenseInputsMap.get("child-1-clothing")) +
    getValue(expenseInputsMap.get("child-2-clothing")) +
    getValue(expenseInputsMap.get("child-3-clothing")) +
    getValue(expenseInputsMap.get("school-bags"));
  const childrenTotal = getCategoryTotal("children-school") + childrenClothingTotal;
  const vacationTotal = getCategoryTotal("entertainment-holidays");
  const housingRatio = totalIncome > 0 ? housingTotal / totalIncome : 0;
  const statusKey = getStatusKey(totalIncome, remainingBalance);
  const languageSet = translations[currentLanguage];

  totalIncomeEl.textContent = formatCurrency(totalIncome);
  resultTotalIncomeEl.textContent = formatCurrency(totalIncome);
  resultTotalExpensesEl.textContent = formatCurrency(totalExpenses);
  resultRemainingBalanceEl.textContent = formatCurrency(remainingBalance);
  remainingBalanceEl.textContent = formatCurrency(remainingBalance);
  housingRatioEl.textContent = formatPercent(housingRatio);
  carCostsTotalEl.textContent = formatCurrency(carCostsTotal);
  foodTotalEl.textContent = formatCurrency(foodTotal);
  childrenTotalEl.textContent = formatCurrency(childrenTotal);
  vacationTotalEl.textContent = formatCurrency(vacationTotal);
  statusTextEl.textContent = languageSet[statusKey];
  statusTextEl.style.color = remainingBalance < 0 ? "#b5473f" : "#1f6f5f";
  remainingBalanceEl.style.color = remainingBalance < 0 ? "#b5473f" : "#1f6f5f";
  balanceCardEl.classList.toggle("negative", remainingBalance < 0);
  warningMessageEl.textContent = languageSet.warningMessage;
  warningMessageEl.classList.toggle("hidden", !(totalExpenses > totalIncome));

  updateCategoryTotals();
  updateChart({
    housing: housingTotal,
    food: foodTotal,
    cars: carCostsTotal,
    children: childrenTotal,
  });
}

function initializePlanner() {
  renderIncomeFields();
  renderExpenseSections();
  collectTranslatableElements();

  const savedLanguage = localStorage.getItem(languageStorageKey);
  if (savedLanguage === "ar" || savedLanguage === "en") {
    currentLanguage = savedLanguage;
  }

  restoreFormData();
  applyLanguage(currentLanguage);
  updateFinanceSummary();
}

function setAllSectionsOpen(isOpen) {
  document.querySelectorAll("[data-section-card]").forEach((section) => {
    section.open = isOpen;
  });
  updateSectionToggleLabels();
}

form.addEventListener("input", () => {
  saveFormData();
  updateFinanceSummary();
});

languageToggleEl.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "en" ? "ar" : "en";
  applyLanguage(nextLanguage);
  updateFinanceSummary();
});

clearDataButtonEl.addEventListener("click", () => {
  clearFormData();
  updateFinanceSummary();
});

expandAllButtonEl.addEventListener("click", () => {
  setAllSectionsOpen(true);
});

collapseAllButtonEl.addEventListener("click", () => {
  setAllSectionsOpen(false);
});

document.addEventListener("toggle", (event) => {
  if (event.target.matches("[data-section-card]")) {
    updateSectionToggleLabels();
  }
});

initializePlanner();
