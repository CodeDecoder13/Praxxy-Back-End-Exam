import {
  __esm,
  __export,
  __publicField,
  __toCommonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/preline/src/utils/index.ts
var stringToBoolean, getClassProperty, getClassPropertyAlt, isIOS, isIpadOS, isDirectChild, isEnoughSpace, isFormElement, isParentOrElementHidden, isJson, debounce, dispatch, afterTransition, htmlToElement, classToClassList, menuSearchHistory;
var init_utils = __esm({
  "node_modules/preline/src/utils/index.ts"() {
    stringToBoolean = (string) => {
      return string === "true" ? true : false;
    };
    getClassProperty = (el, prop, val = "") => {
      return (window.getComputedStyle(el).getPropertyValue(prop) || val).replace(
        " ",
        ""
      );
    };
    getClassPropertyAlt = (el, prop, val = "") => {
      let targetClass = "";
      el.classList.forEach((c) => {
        if (c.includes(prop)) {
          targetClass = c;
        }
      });
      return targetClass.match(/:(.*)]/) ? targetClass.match(/:(.*)]/)[1] : val;
    };
    isIOS = () => {
      if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
      } else {
        return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
      }
    };
    isIpadOS = () => {
      return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
    };
    isDirectChild = (parent, child) => {
      const children = parent.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i] === child) return true;
      }
      return false;
    };
    isEnoughSpace = (el, toggle, preferredPosition = "auto", space = 10, wrapper = null) => {
      const referenceRect = toggle.getBoundingClientRect();
      const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : null;
      const viewportHeight = window.innerHeight;
      const spaceAbove = wrapperRect ? referenceRect.top - wrapperRect.top : referenceRect.top;
      const spaceBelow = (wrapper ? wrapperRect.bottom : viewportHeight) - referenceRect.bottom;
      const minimumSpaceRequired = el.clientHeight + space;
      if (preferredPosition === "bottom") {
        return spaceBelow >= minimumSpaceRequired;
      } else if (preferredPosition === "top") {
        return spaceAbove >= minimumSpaceRequired;
      } else {
        return spaceAbove >= minimumSpaceRequired || spaceBelow >= minimumSpaceRequired;
      }
    };
    isFormElement = (target) => {
      return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
    };
    isParentOrElementHidden = (element) => {
      if (!element) return false;
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.display === "none") return true;
      return isParentOrElementHidden(element.parentElement);
    };
    isJson = (str) => {
      if (typeof str !== "string") return false;
      const firstChar = str.trim()[0];
      const lastChar = str.trim().slice(-1);
      if (firstChar === "{" && lastChar === "}" || firstChar === "[" && lastChar === "]") {
        try {
          JSON.parse(str);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    };
    debounce = (func, timeout = 200) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(void 0, args);
        }, timeout);
      };
    };
    dispatch = (evt, element, payload = null) => {
      const event = new CustomEvent(evt, {
        detail: { payload },
        bubbles: true,
        cancelable: true,
        composed: false
      });
      element.dispatchEvent(event);
    };
    afterTransition = (el, callback) => {
      const handleEvent = () => {
        callback();
        el.removeEventListener("transitionend", handleEvent, true);
      };
      const computedStyle = window.getComputedStyle(el);
      const transitionDuration = computedStyle.getPropertyValue(
        "transition-duration"
      );
      const transitionProperty = computedStyle.getPropertyValue(
        "transition-property"
      );
      const hasTransition = transitionProperty !== "none" && parseFloat(transitionDuration) > 0;
      if (hasTransition) el.addEventListener("transitionend", handleEvent, true);
      else callback();
    };
    htmlToElement = (html) => {
      const template = document.createElement("template");
      html = html.trim();
      template.innerHTML = html;
      return template.content.firstChild;
    };
    classToClassList = (classes, target, splitter = " ", action = "add") => {
      const classesToArray = classes.split(splitter);
      classesToArray.forEach(
        (cl) => action === "add" ? target.classList.add(cl) : target.classList.remove(cl)
      );
    };
    menuSearchHistory = {
      historyIndex: -1,
      addHistory(index) {
        this.historyIndex = index;
      },
      existsInHistory(index) {
        return index > this.historyIndex;
      },
      clearHistory() {
        this.historyIndex = -1;
      }
    };
  }
});

// node_modules/preline/src/plugins/base-plugin/index.ts
var HSBasePlugin;
var init_base_plugin = __esm({
  "node_modules/preline/src/plugins/base-plugin/index.ts"() {
    HSBasePlugin = class {
      constructor(el, options, events) {
        this.el = el;
        this.options = options;
        this.events = events;
        this.el = el;
        this.options = options;
        this.events = {};
      }
      createCollection(collection, element) {
        var _a;
        collection.push({
          id: ((_a = element == null ? void 0 : element.el) == null ? void 0 : _a.id) || collection.length + 1,
          element
        });
      }
      fireEvent(evt, payload = null) {
        if (this.events.hasOwnProperty(evt)) return this.events[evt](payload);
      }
      on(evt, cb) {
        this.events[evt] = cb;
      }
    };
  }
});

// node_modules/preline/src/plugins/datatable/index.ts
var datatable_exports = {};
__export(datatable_exports, {
  default: () => datatable_default
});
var HSDataTable, datatable_default;
var init_datatable = __esm({
  "node_modules/preline/src/plugins/datatable/index.ts"() {
    init_utils();
    init_base_plugin();
    HSDataTable = class _HSDataTable extends HSBasePlugin {
      constructor(el, options, events) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        super(el, options, events);
        __publicField(this, "concatOptions");
        __publicField(this, "dataTable");
        __publicField(this, "table");
        __publicField(this, "searches");
        __publicField(this, "pageEntitiesList");
        __publicField(this, "pagingList");
        __publicField(this, "pagingPagesList");
        __publicField(this, "pagingPrevList");
        __publicField(this, "pagingNextList");
        __publicField(this, "infoList");
        __publicField(this, "rowSelectingAll");
        __publicField(this, "rowSelectingIndividual");
        __publicField(this, "maxPagesToShow");
        __publicField(this, "isRowSelecting");
        __publicField(this, "pageBtnClasses");
        __publicField(this, "onSearchInputListener");
        __publicField(this, "onPageEntitiesChangeListener");
        __publicField(this, "onSinglePagingClickListener");
        __publicField(this, "onPagingPrevClickListener");
        __publicField(this, "onPagingNextClickListener");
        __publicField(this, "onRowSelectingAllChangeListener");
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        const columnDefs = [];
        Array.from(this.el.querySelectorAll("thead th, thead td")).forEach(
          (th, ind) => {
            if (th.classList.contains("--exclude-from-ordering"))
              columnDefs.push({
                targets: ind,
                orderable: false
              });
          }
        );
        const data = this.el.getAttribute("data-hs-datatable");
        const dataOptions = data ? JSON.parse(data) : {};
        this.concatOptions = {
          searching: true,
          lengthChange: false,
          order: [],
          columnDefs: [...columnDefs],
          ...dataOptions,
          ...options
        };
        this.table = this.el.querySelector("table");
        this.searches = Array.from(this.el.querySelectorAll("[data-hs-datatable-search]")) ?? null;
        this.pageEntitiesList = Array.from(this.el.querySelectorAll("[data-hs-datatable-page-entities]")) ?? null;
        this.pagingList = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging]")) ?? null;
        this.pagingPagesList = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-pages]")) ?? null;
        this.pagingPrevList = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-prev]")) ?? null;
        this.pagingNextList = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-next]")) ?? null;
        this.infoList = Array.from(this.el.querySelectorAll("[data-hs-datatable-info]")) ?? null;
        if ((_a = this.concatOptions) == null ? void 0 : _a.rowSelectingOptions)
          this.rowSelectingAll = (((_c = (_b = this.concatOptions) == null ? void 0 : _b.rowSelectingOptions) == null ? void 0 : _c.selectAllSelector) ? document.querySelector(
            (_e = (_d = this.concatOptions) == null ? void 0 : _d.rowSelectingOptions) == null ? void 0 : _e.selectAllSelector
          ) : document.querySelector("[data-hs-datatable-row-selecting-all]")) ?? null;
        if ((_f = this.concatOptions) == null ? void 0 : _f.rowSelectingOptions)
          this.rowSelectingIndividual = ((_h = (_g = this.concatOptions) == null ? void 0 : _g.rowSelectingOptions) == null ? void 0 : _h.individualSelector) ?? "[data-hs-datatable-row-selecting-individual]" ?? null;
        if (this.pageEntitiesList.length) this.concatOptions.pageLength = parseInt(this.pageEntitiesList[0].value);
        this.maxPagesToShow = 3;
        this.isRowSelecting = !!((_i = this.concatOptions) == null ? void 0 : _i.rowSelectingOptions);
        this.pageBtnClasses = ((_k = (_j = this.concatOptions) == null ? void 0 : _j.pagingOptions) == null ? void 0 : _k.pageBtnClasses) ?? null;
        this.onSearchInputListener = [];
        this.onPageEntitiesChangeListener = [];
        this.onSinglePagingClickListener = [];
        this.onPagingPrevClickListener = [];
        this.onPagingNextClickListener = [];
        this.init();
      }
      init() {
        this.createCollection(window.$hsDataTableCollection, this);
        this.initTable();
        if (this.searches.length) this.initSearch();
        if (this.pageEntitiesList.length) this.initPageEntities();
        if (this.pagingList.length) this.initPaging();
        if (this.pagingPagesList.length) this.buildPagingPages();
        if (this.pagingPrevList.length) this.initPagingPrev();
        if (this.pagingNextList.length) this.initPagingNext();
        if (this.infoList.length) this.initInfo();
        if (this.isRowSelecting) this.initRowSelecting();
      }
      initTable() {
        this.dataTable = new DataTable(this.table, this.concatOptions);
        if (this.isRowSelecting) this.triggerChangeEventToRow();
        this.dataTable.on("draw", () => {
          if (this.isRowSelecting) this.updateSelectAllCheckbox();
          if (this.isRowSelecting) this.triggerChangeEventToRow();
          this.updateInfo();
          this.pagingPagesList.forEach((el) => this.updatePaging(el));
        });
      }
      searchInput(evt) {
        this.onSearchInput(evt.target.value);
      }
      pageEntitiesChange(evt) {
        this.onEntitiesChange(parseInt(evt.target.value), evt.target);
      }
      pagingPrevClick() {
        this.onPrevClick();
      }
      pagingNextClick() {
        this.onNextClick();
      }
      rowSelectingAllChange() {
        this.onSelectAllChange();
      }
      singlePagingClick(count) {
        this.onPageClick(count);
      }
      // Search
      initSearch() {
        this.searches.forEach((el) => {
          this.onSearchInputListener.push({
            el,
            fn: debounce((evt) => this.searchInput(evt))
          });
          el.addEventListener("input", this.onSearchInputListener.find((search) => search.el === el).fn);
        });
      }
      onSearchInput(val) {
        this.dataTable.search(val).draw();
      }
      // Page entities
      initPageEntities() {
        this.pageEntitiesList.forEach((el) => {
          this.onPageEntitiesChangeListener.push({
            el,
            fn: (evt) => this.pageEntitiesChange(evt)
          });
          el.addEventListener("change", this.onPageEntitiesChangeListener.find((pageEntity) => pageEntity.el === el).fn);
        });
      }
      onEntitiesChange(entities, target) {
        const otherEntities = this.pageEntitiesList.filter((el) => el !== target);
        if (otherEntities.length) otherEntities.forEach((el) => {
          if (window.HSSelect) {
            const hsSelectInstance = window.HSSelect.getInstance(el, true);
            if (hsSelectInstance) hsSelectInstance.element.setValue(`${entities}`);
          } else el.value = `${entities}`;
        });
        this.dataTable.page.len(entities).draw();
      }
      // Info
      initInfo() {
        this.infoList.forEach((el) => {
          this.initInfoFrom(el);
          this.initInfoTo(el);
          this.initInfoLength(el);
        });
      }
      initInfoFrom(el) {
        const infoFrom = el.querySelector("[data-hs-datatable-info-from]") ?? null;
        const { start: start2 } = this.dataTable.page.info();
        if (infoFrom) infoFrom.innerText = `${start2 + 1}`;
      }
      initInfoTo(el) {
        const infoTo = el.querySelector("[data-hs-datatable-info-to]") ?? null;
        const { end: end2 } = this.dataTable.page.info();
        if (infoTo) infoTo.innerText = `${end2}`;
      }
      initInfoLength(el) {
        const infoLength = el.querySelector("[data-hs-datatable-info-length]") ?? null;
        const { recordsTotal } = this.dataTable.page.info();
        if (infoLength) infoLength.innerText = `${recordsTotal}`;
      }
      updateInfo() {
        this.initInfo();
      }
      // Paging
      initPaging() {
        this.pagingList.forEach((el) => this.hidePagingIfSinglePage(el));
      }
      hidePagingIfSinglePage(el) {
        const { pages } = this.dataTable.page.info();
        if (pages < 2) {
          el.classList.add("hidden");
          el.style.display = "none";
        } else {
          el.classList.remove("hidden");
          el.style.display = "";
        }
      }
      initPagingPrev() {
        this.pagingPrevList.forEach((el) => {
          this.onPagingPrevClickListener.push({
            el,
            fn: () => this.pagingPrevClick()
          });
          el.addEventListener("click", this.onPagingPrevClickListener.find((pagingPrev) => pagingPrev.el === el).fn);
        });
      }
      onPrevClick() {
        this.dataTable.page("previous").draw("page");
      }
      disablePagingArrow(el, statement) {
        if (statement) {
          el.classList.add("disabled");
          el.setAttribute("disabled", "disabled");
        } else {
          el.classList.remove("disabled");
          el.removeAttribute("disabled");
        }
      }
      initPagingNext() {
        this.pagingNextList.forEach((el) => {
          this.onPagingNextClickListener.push({
            el,
            fn: () => this.pagingNextClick()
          });
          el.addEventListener("click", this.onPagingNextClickListener.find((pagingNext) => pagingNext.el === el).fn);
        });
      }
      onNextClick() {
        this.dataTable.page("next").draw("page");
      }
      buildPagingPages() {
        this.pagingPagesList.forEach((el) => this.updatePaging(el));
      }
      updatePaging(pagingPages) {
        const { page, pages, length } = this.dataTable.page.info();
        const totalRecords = this.dataTable.rows({ search: "applied" }).count();
        const totalPages = Math.ceil(totalRecords / length);
        const currentPage = page + 1;
        let startPage = Math.max(1, currentPage - Math.floor(this.maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + (this.maxPagesToShow - 1));
        if (endPage - startPage + 1 < this.maxPagesToShow) {
          startPage = Math.max(1, endPage - this.maxPagesToShow + 1);
        }
        pagingPages.innerHTML = "";
        if (startPage > 1) {
          this.buildPagingPage(1, pagingPages);
          if (startPage > 2) pagingPages.appendChild(htmlToElement(`<span class="ellipsis">...</span>`));
        }
        for (let i = startPage; i <= endPage; i++) {
          this.buildPagingPage(i, pagingPages);
        }
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) pagingPages.appendChild(htmlToElement(`<span class="ellipsis">...</span>`));
          this.buildPagingPage(totalPages, pagingPages);
        }
        this.pagingPrevList.forEach((el) => this.disablePagingArrow(el, page === 0));
        this.pagingNextList.forEach((el) => this.disablePagingArrow(el, page === pages - 1));
        this.pagingList.forEach((el) => this.hidePagingIfSinglePage(el));
      }
      buildPagingPage(counter, target) {
        const { page } = this.dataTable.page.info();
        const pageEl = htmlToElement(`<button type="button"></button>`);
        pageEl.innerText = `${counter}`;
        pageEl.setAttribute("data-page", `${counter}`);
        if (this.pageBtnClasses) classToClassList(this.pageBtnClasses, pageEl);
        if (page === counter - 1) pageEl.classList.add("active");
        this.onSinglePagingClickListener.push({
          el: pageEl,
          fn: () => this.singlePagingClick(counter)
        });
        pageEl.addEventListener("click", this.onSinglePagingClickListener.find((singlePaging) => singlePaging.el === pageEl).fn);
        target.append(pageEl);
      }
      onPageClick(counter) {
        this.dataTable.page(counter - 1).draw("page");
      }
      // Select row
      initRowSelecting() {
        this.onRowSelectingAllChangeListener = () => this.rowSelectingAllChange();
        this.rowSelectingAll.addEventListener(
          "change",
          this.onRowSelectingAllChangeListener
        );
      }
      triggerChangeEventToRow() {
        this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach((el) => {
          el.addEventListener("change", () => {
            this.updateSelectAllCheckbox();
          });
        });
      }
      onSelectAllChange() {
        let isChecked = this.rowSelectingAll.checked;
        const visibleRows = Array.from(
          this.dataTable.rows({ page: "current", search: "applied" }).nodes()
        );
        visibleRows.forEach((el) => {
          const checkbox = el.querySelector(this.rowSelectingIndividual);
          if (checkbox) checkbox.checked = isChecked;
        });
        this.updateSelectAllCheckbox();
      }
      updateSelectAllCheckbox() {
        const searchRelatedItems = this.dataTable.rows({ search: "applied" }).count();
        if (!searchRelatedItems) {
          this.rowSelectingAll.checked = false;
          return false;
        }
        let isChecked = true;
        const visibleRows = Array.from(
          this.dataTable.rows({
            page: "current",
            search: "applied"
          }).nodes()
        );
        visibleRows.forEach((el) => {
          const checkbox = el.querySelector(this.rowSelectingIndividual);
          if (checkbox && !checkbox.checked) {
            isChecked = false;
            return false;
          }
        });
        this.rowSelectingAll.checked = isChecked;
      }
      // Public methods
      destroy() {
        if (this.searches) {
          this.onSearchInputListener.forEach(({ el, fn: fn2 }) => el.removeEventListener("click", fn2));
        }
        if (this.pageEntitiesList) this.onPageEntitiesChangeListener.forEach(({ el, fn: fn2 }) => el.removeEventListener("change", fn2));
        if (this.pagingPagesList.length) {
          this.onSinglePagingClickListener.forEach(({ el, fn: fn2 }) => el.removeEventListener("click", fn2));
          this.pagingPagesList.forEach((el) => el.innerHTML = "");
        }
        if (this.pagingPrevList.length) this.onPagingPrevClickListener.forEach(({ el, fn: fn2 }) => el.removeEventListener("click", fn2));
        if (this.pagingNextList.length) this.onPagingNextClickListener.forEach(({ el, fn: fn2 }) => el.removeEventListener("click", fn2));
        if (this.rowSelectingAll)
          this.rowSelectingAll.removeEventListener(
            "change",
            this.onRowSelectingAllChangeListener
          );
        this.dataTable.destroy();
        this.rowSelectingAll = null;
        this.rowSelectingIndividual = null;
        window.$hsDataTableCollection = window.$hsDataTableCollection.filter(({ element }) => element.el !== this.el);
      }
      // Static methods
      static getInstance(target, isInstance) {
        const elInCollection = window.$hsDataTableCollection.find(
          (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
        );
        return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
      }
      static autoInit() {
        if (!window.$hsDataTableCollection) window.$hsDataTableCollection = [];
        if (window.$hsDataTableCollection)
          window.$hsDataTableCollection = window.$hsDataTableCollection.filter(
            ({ element }) => document.contains(element.el)
          );
        document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach((el) => {
          if (!window.$hsDataTableCollection.find(
            (elC) => {
              var _a;
              return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
            }
          ))
            new _HSDataTable(el);
        });
      }
    };
    window.addEventListener("load", () => {
      if (document.querySelectorAll(
        "[data-hs-datatable]:not(.--prevent-on-load-init)"
      ).length) {
        if (typeof jQuery === "undefined")
          console.error(
            "HSDataTable: jQuery is not available, please add it to the page."
          );
        if (typeof DataTable === "undefined")
          console.error(
            "HSDataTable: DataTable is not available, please add it to the page."
          );
      }
      if (typeof DataTable !== "undefined" && typeof jQuery !== "undefined")
        HSDataTable.autoInit();
    });
    if (typeof window !== "undefined") {
      window.HSDataTable = HSDataTable;
    }
    datatable_default = HSDataTable;
  }
});

// node_modules/preline/src/plugins/file-upload/index.ts
var file_upload_exports = {};
__export(file_upload_exports, {
  default: () => file_upload_default
});
var HSFileUpload, file_upload_default;
var init_file_upload = __esm({
  "node_modules/preline/src/plugins/file-upload/index.ts"() {
    init_utils();
    init_base_plugin();
    if (typeof Dropzone !== "undefined") Dropzone.autoDiscover = false;
    HSFileUpload = class _HSFileUpload extends HSBasePlugin {
      constructor(el, options, events) {
        var _a;
        super(el, options, events);
        __publicField(this, "concatOptions");
        __publicField(this, "previewTemplate");
        __publicField(this, "extensions", {});
        __publicField(this, "singleton");
        __publicField(this, "dropzone");
        __publicField(this, "onReloadButtonClickListener");
        __publicField(this, "onTempFileInputChangeListener");
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        const data = this.el.getAttribute("data-hs-file-upload");
        const dataOptions = data ? JSON.parse(data) : {};
        this.previewTemplate = ((_a = this.el.querySelector("[data-hs-file-upload-preview]")) == null ? void 0 : _a.innerHTML) || `<div class="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
			<div class="mb-2 flex justify-between items-center">
				<div class="flex items-center gap-x-3">
					<span class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500" data-hs-file-upload-file-icon></span>
					<div>
						<p class="text-sm font-medium text-gray-800 dark:text-white">
							<span class="truncate inline-block max-w-[300px] align-bottom" data-hs-file-upload-file-name></span>.<span data-hs-file-upload-file-ext></span>
						</p>
						<p class="text-xs text-gray-500 dark:text-neutral-500" data-hs-file-upload-file-size></p>
					</div>
				</div>
				<div class="inline-flex items-center gap-x-2">
					<button type="button" class="text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200" data-hs-file-upload-remove>
						<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
					</button>
				</div>
			</div>
			<div class="flex items-center gap-x-3 whitespace-nowrap">
				<div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar>
					<div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-600 dark:bg-blue-500" style="width: 0" data-hs-file-upload-progress-bar-pane></div>
				</div>
				<div class="w-10 text-end">
					<span class="text-sm text-gray-800 dark:text-white">
						<span data-hs-file-upload-progress-bar-value>0</span>%
					</span>
				</div>
			</div>
		</div>`;
        this.extensions = _.merge(
          {
            default: {
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
              class: "size-5"
            },
            xls: {
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0243 1.43996H7.08805C6.82501 1.43996 6.57277 1.54445 6.38677 1.73043C6.20077 1.91642 6.09631 2.16868 6.09631 2.43171V6.64796L15.0243 11.856L19.4883 13.7398L23.9523 11.856V6.64796L15.0243 1.43996Z" fill="#21A366"></path><path d="M6.09631 6.64796H15.0243V11.856H6.09631V6.64796Z" fill="#107C41"></path><path d="M22.9605 1.43996H15.0243V6.64796H23.9523V2.43171C23.9523 2.16868 23.8478 1.91642 23.6618 1.73043C23.4758 1.54445 23.2235 1.43996 22.9605 1.43996Z" fill="#33C481"></path><path d="M15.0243 11.856H6.09631V21.2802C6.09631 21.5433 6.20077 21.7955 6.38677 21.9815C6.57277 22.1675 6.82501 22.272 7.08805 22.272H22.9606C23.2236 22.272 23.4759 22.1675 23.6618 21.9815C23.8478 21.7955 23.9523 21.5433 23.9523 21.2802V17.064L15.0243 11.856Z" fill="#185C37"></path><path d="M15.0243 11.856H23.9523V17.064H15.0243V11.856Z" fill="#107C41"></path><path opacity="0.1" d="M12.5446 5.15996H6.09631V19.296H12.5446C12.8073 19.2952 13.0591 19.1904 13.245 19.0046C13.4308 18.8188 13.5355 18.567 13.5363 18.3042V6.1517C13.5355 5.88892 13.4308 5.63712 13.245 5.4513C13.0591 5.26548 12.8073 5.16074 12.5446 5.15996Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V20.04H11.8006C12.0633 20.0392 12.3151 19.9344 12.501 19.7486C12.6868 19.5628 12.7915 19.311 12.7923 19.0482V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V18.552H11.8006C12.0633 18.5512 12.3151 18.4464 12.501 18.2606C12.6868 18.0748 12.7915 17.823 12.7923 17.5602V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.0566 5.90396H6.09631V18.552H11.0566C11.3193 18.5512 11.5711 18.4464 11.757 18.2606C11.9428 18.0748 12.0475 17.823 12.0483 17.5602V6.8957C12.0475 6.6329 11.9428 6.38114 11.757 6.19532C11.5711 6.0095 11.3193 5.90475 11.0566 5.90396Z" fill="black"></path><path d="M1.13604 5.90396H11.0566C11.3195 5.90396 11.5718 6.00842 11.7578 6.19442C11.9438 6.38042 12.0483 6.63266 12.0483 6.8957V16.8162C12.0483 17.0793 11.9438 17.3315 11.7578 17.5175C11.5718 17.7035 11.3195 17.808 11.0566 17.808H1.13604C0.873012 17.808 0.620754 17.7035 0.434765 17.5175C0.248775 17.3315 0.144287 17.0793 0.144287 16.8162V6.8957C0.144287 6.63266 0.248775 6.38042 0.434765 6.19442C0.620754 6.00842 0.873012 5.90396 1.13604 5.90396Z" fill="#107C41"></path><path d="M2.77283 15.576L5.18041 11.8455L2.9752 8.13596H4.74964L5.95343 10.5071C6.06401 10.7318 6.14015 10.8994 6.18185 11.01H6.19745C6.27683 10.8305 6.35987 10.6559 6.44669 10.4863L7.73309 8.13596H9.36167L7.09991 11.8247L9.41897 15.576H7.68545L6.29489 12.972C6.22943 12.861 6.17387 12.7445 6.12899 12.6238H6.10817C6.06761 12.7419 6.01367 12.855 5.94748 12.9608L4.51676 15.576H2.77283Z" fill="white"></path></svg>',
              class: "size-5"
            },
            doc: {
              icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z" fill="#41A5EE"></path><path d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z" fill="#2B7CD3"></path><path d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z" fill="#185ABD"></path><path d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z" fill="#103F91"></path><path opacity="0.1" d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z" fill="#185ABD"></path><path d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z" fill="white"></path></svg>',
              class: "size-5"
            },
            zip: {
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="20" r="2"/><path d="M10 7V6"/><path d="M10 12v-1"/><path d="M10 18v-2"/></svg>',
              class: "size-5"
            }
          },
          dataOptions.extensions
        );
        this.singleton = dataOptions.singleton;
        this.concatOptions = {
          clickable: this.el.querySelector(
            "[data-hs-file-upload-trigger]"
          ),
          previewsContainer: this.el.querySelector(
            "[data-hs-file-upload-previews]"
          ),
          addRemoveLinks: false,
          previewTemplate: this.previewTemplate,
          autoHideTrigger: false,
          ...dataOptions,
          ...options
        };
        this.onReloadButtonClickListener = [];
        this.onTempFileInputChangeListener = [];
        this.init();
      }
      tempFileInputChange(event, file) {
        var _a;
        const input = event.target;
        const newFile = (_a = input.files) == null ? void 0 : _a[0];
        if (newFile) {
          const dzNewFile = newFile;
          dzNewFile.status = Dropzone.ADDED;
          dzNewFile.accepted = true;
          dzNewFile.previewElement = file.previewElement;
          dzNewFile.previewTemplate = file.previewTemplate;
          dzNewFile.previewsContainer = file.previewsContainer;
          this.dropzone.removeFile(file);
          this.dropzone.addFile(dzNewFile);
        }
      }
      reloadButtonClick(evt, file) {
        evt.preventDefault();
        evt.stopPropagation();
        const tempFileInput = document.createElement("input");
        tempFileInput.type = "file";
        this.onTempFileInputChangeListener.push({
          el: tempFileInput,
          fn: (event) => this.tempFileInputChange(event, file)
        });
        tempFileInput.click();
        tempFileInput.addEventListener(
          "change",
          this.onTempFileInputChangeListener.find((el) => el.el === tempFileInput).fn
        );
      }
      init() {
        this.createCollection(window.$hsFileUploadCollection, this);
        this.initDropzone();
      }
      initDropzone() {
        const clear = this.el.querySelector(
          "[data-hs-file-upload-clear]"
        );
        const pseudoTriggers = Array.from(
          this.el.querySelectorAll("[data-hs-file-upload-pseudo-trigger]")
        );
        this.dropzone = new Dropzone(this.el, this.concatOptions);
        this.dropzone.on("addedfile", (file) => this.onAddFile(file));
        this.dropzone.on("removedfile", () => this.onRemoveFile());
        this.dropzone.on(
          "uploadprogress",
          (file, progress) => this.onUploadProgress(file, progress)
        );
        this.dropzone.on("complete", (file) => this.onComplete(file));
        if (clear)
          clear.onclick = () => {
            if (this.dropzone.files.length) this.dropzone.removeAllFiles(true);
          };
        if (pseudoTriggers.length)
          pseudoTriggers.forEach((el) => {
            el.onclick = () => {
              var _a, _b;
              if ((_a = this.concatOptions) == null ? void 0 : _a.clickable)
                ((_b = this.concatOptions) == null ? void 0 : _b.clickable).click();
            };
          });
      }
      // Public methods
      destroy() {
        this.onTempFileInputChangeListener.forEach((el) => {
          el.el.removeEventListener("change", el.fn);
        });
        this.onTempFileInputChangeListener = null;
        this.onReloadButtonClickListener.forEach((el) => {
          el.el.removeEventListener("click", el.fn);
        });
        this.onReloadButtonClickListener = null;
        this.dropzone.destroy();
        window.$hsFileUploadCollection = window.$hsFileUploadCollection.filter(
          ({ element }) => element.el !== this.el
        );
      }
      onAddFile(file) {
        const { previewElement } = file;
        const reloadButton = file.previewElement.querySelector(
          "[data-hs-file-upload-reload]"
        );
        if (!previewElement) return false;
        if (this.singleton && this.dropzone.files.length > 1)
          this.dropzone.removeFile(this.dropzone.files[0]);
        if (reloadButton) {
          this.onReloadButtonClickListener.push({
            el: reloadButton,
            fn: (evt) => this.reloadButtonClick(evt, file)
          });
          reloadButton.addEventListener(
            "click",
            this.onReloadButtonClickListener.find((el) => el.el === reloadButton).fn
          );
        }
        this.previewAccepted(file);
      }
      previewAccepted(file) {
        const { previewElement } = file;
        const fileInfo = this.splitFileName(file.name);
        const fileName = previewElement.querySelector(
          "[data-hs-file-upload-file-name]"
        );
        const fileExt = previewElement.querySelector(
          "[data-hs-file-upload-file-ext]"
        );
        const fileSize = previewElement.querySelector(
          "[data-hs-file-upload-file-size]"
        );
        const fileIcon = previewElement.querySelector(
          "[data-hs-file-upload-file-icon]"
        );
        const trigger = this.el.querySelector(
          "[data-hs-file-upload-trigger]"
        );
        const preview = previewElement.querySelector(
          "[data-dz-thumbnail]"
        );
        const remove = previewElement.querySelector(
          "[data-hs-file-upload-remove]"
        );
        if (fileName) fileName.textContent = fileInfo.name;
        if (fileExt) fileExt.textContent = fileInfo.extension;
        if (fileSize) fileSize.textContent = this.formatFileSize(file.size);
        if (preview) {
          if (file.type.includes("image/")) preview.classList.remove("hidden");
          else this.setIcon(fileInfo.extension, fileIcon);
        }
        if (this.dropzone.files.length > 0 && this.concatOptions.autoHideTrigger)
          trigger.style.display = "none";
        if (remove) remove.onclick = () => this.dropzone.removeFile(file);
      }
      onRemoveFile() {
        const trigger = this.el.querySelector(
          "[data-hs-file-upload-trigger]"
        );
        if (this.dropzone.files.length === 0 && this.concatOptions.autoHideTrigger)
          trigger.style.display = "";
      }
      onUploadProgress(file, progress) {
        const { previewElement } = file;
        if (!previewElement) return false;
        const progressBar = previewElement.querySelector(
          "[data-hs-file-upload-progress-bar]"
        );
        const progressBarPane = previewElement.querySelector(
          "[data-hs-file-upload-progress-bar-pane]"
        );
        const progressBarValue = previewElement.querySelector(
          "[data-hs-file-upload-progress-bar-value]"
        );
        const currentProgress = Math.floor(progress);
        if (progressBar)
          progressBar.setAttribute("aria-valuenow", `${currentProgress}`);
        if (progressBarPane) progressBarPane.style.width = `${currentProgress}%`;
        if (progressBarValue) progressBarValue.innerText = `${currentProgress}`;
      }
      onComplete(file) {
        const { previewElement } = file;
        if (!previewElement) return false;
        previewElement.classList.add("complete");
      }
      setIcon(ext, file) {
        const icon = this.createIcon(ext);
        file.append(icon);
      }
      createIcon(ext) {
        var _a, _b;
        const icon = ((_a = this.extensions[ext]) == null ? void 0 : _a.icon) ? htmlToElement(this.extensions[ext].icon) : htmlToElement(this.extensions.default.icon);
        classToClassList(
          ((_b = this.extensions[ext]) == null ? void 0 : _b.class) ? this.extensions[ext].class : this.extensions.default.class,
          icon
        );
        return icon;
      }
      formatFileSize(size) {
        if (size < 1024) {
          return size.toFixed(2) + " B";
        } else if (size < 1024 * 1024) {
          return (size / 1024).toFixed(2) + " KB";
        } else if (size < 1024 * 1024 * 1024) {
          return (size / (1024 * 1024)).toFixed(2) + " MB";
        } else if (size < 1024 * 1024 * 1024 * 1024) {
          return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        } else {
          return (size / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
        }
      }
      splitFileName(file) {
        let dotIndex = file.lastIndexOf(".");
        if (dotIndex == -1) return { name: file, extension: "" };
        return {
          name: file.substring(0, dotIndex),
          extension: file.substring(dotIndex + 1)
        };
      }
      // Static methods
      static getInstance(target, isInstance) {
        const elInCollection = window.$hsFileUploadCollection.find(
          (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
        );
        return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
      }
      static autoInit() {
        if (!window.$hsFileUploadCollection) window.$hsFileUploadCollection = [];
        if (window.$hsFileUploadCollection)
          window.$hsFileUploadCollection = window.$hsFileUploadCollection.filter(
            ({ element }) => document.contains(element.el)
          );
        document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").forEach((el) => {
          if (!window.$hsFileUploadCollection.find(
            (elC) => {
              var _a;
              return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
            }
          ))
            new _HSFileUpload(el);
        });
      }
    };
    window.addEventListener("load", () => {
      if (document.querySelectorAll(
        "[data-hs-file-upload]:not(.--prevent-on-load-init)"
      ).length) {
        if (typeof _ === "undefined")
          console.error(
            "HSFileUpload: Lodash is not available, please add it to the page."
          );
        if (typeof Dropzone === "undefined")
          console.error(
            "HSFileUpload: Dropzone is not available, please add it to the page."
          );
      }
      if (typeof _ !== "undefined" && typeof Dropzone !== "undefined") {
        HSFileUpload.autoInit();
      }
    });
    if (typeof window !== "undefined") {
      window.HSFileUpload = HSFileUpload;
    }
    file_upload_default = HSFileUpload;
  }
});

// node_modules/preline/src/plugins/range-slider/index.ts
var range_slider_exports = {};
__export(range_slider_exports, {
  default: () => range_slider_default
});
var HSRangeSlider, range_slider_default;
var init_range_slider = __esm({
  "node_modules/preline/src/plugins/range-slider/index.ts"() {
    init_base_plugin();
    HSRangeSlider = class _HSRangeSlider extends HSBasePlugin {
      constructor(el, options, events) {
        super(el, options, events);
        __publicField(this, "concatOptions");
        __publicField(this, "format");
        const data = el.getAttribute("data-hs-range-slider");
        const dataOptions = data ? JSON.parse(data) : {};
        this.concatOptions = {
          ...dataOptions,
          ...options,
          cssClasses: {
            ...noUiSlider.cssClasses,
            ...this.processClasses(dataOptions.cssClasses)
          }
        };
        this.init();
      }
      get formattedValue() {
        const values = this.el.noUiSlider.get();
        if (Array.isArray(values) && this.format) {
          const updateValues = [];
          values.forEach((val) => {
            updateValues.push(this.format.to(val));
          });
          return updateValues;
        } else if (this.format) {
          return this.format.to(values);
        } else {
          return values;
        }
      }
      processClasses(cl) {
        const mergedClasses = {};
        Object.keys(cl).forEach((key) => {
          if (key) mergedClasses[key] = `${noUiSlider.cssClasses[key]} ${cl[key]}`;
        });
        return mergedClasses;
      }
      init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        this.createCollection(window.$hsRangeSliderCollection, this);
        if (typeof ((_a = this.concatOptions) == null ? void 0 : _a.formatter) === "object" ? ((_c = (_b = this.concatOptions) == null ? void 0 : _b.formatter) == null ? void 0 : _c.type) === "thousandsSeparatorAndDecimalPoints" : ((_d = this.concatOptions) == null ? void 0 : _d.formatter) === "thousandsSeparatorAndDecimalPoints")
          this.thousandsSeparatorAndDecimalPointsFormatter();
        else if (typeof ((_e = this.concatOptions) == null ? void 0 : _e.formatter) === "object" ? ((_g = (_f = this.concatOptions) == null ? void 0 : _f.formatter) == null ? void 0 : _g.type) === "integer" : ((_h = this.concatOptions) == null ? void 0 : _h.formatter) === "integer")
          this.integerFormatter();
        else if (typeof ((_i = this.concatOptions) == null ? void 0 : _i.formatter) === "object" && (((_k = (_j = this.concatOptions) == null ? void 0 : _j.formatter) == null ? void 0 : _k.prefix) || ((_m = (_l = this.concatOptions) == null ? void 0 : _l.formatter) == null ? void 0 : _m.postfix)))
          this.prefixOrPostfixFormatter();
        noUiSlider.create(this.el, this.concatOptions);
        if (this.concatOptions.disabled) this.setDisabled();
      }
      formatValue(val) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        let result = "";
        if (typeof ((_a = this.concatOptions) == null ? void 0 : _a.formatter) === "object") {
          if ((_c = (_b = this.concatOptions) == null ? void 0 : _b.formatter) == null ? void 0 : _c.prefix)
            result += (_e = (_d = this.concatOptions) == null ? void 0 : _d.formatter) == null ? void 0 : _e.prefix;
          result += val;
          if ((_g = (_f = this.concatOptions) == null ? void 0 : _f.formatter) == null ? void 0 : _g.postfix)
            result += (_i = (_h = this.concatOptions) == null ? void 0 : _h.formatter) == null ? void 0 : _i.postfix;
        } else result += val;
        return result;
      }
      integerFormatter() {
        var _a;
        this.format = {
          to: (val) => this.formatValue(Math.round(val)),
          from: (val) => Math.round(+val)
        };
        if ((_a = this.concatOptions) == null ? void 0 : _a.tooltips) this.concatOptions.tooltips = this.format;
      }
      prefixOrPostfixFormatter() {
        var _a;
        this.format = {
          to: (val) => this.formatValue(val),
          from: (val) => +val
        };
        if ((_a = this.concatOptions) == null ? void 0 : _a.tooltips) this.concatOptions.tooltips = this.format;
      }
      thousandsSeparatorAndDecimalPointsFormatter() {
        var _a;
        this.format = {
          to: (val) => this.formatValue(
            new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(val)
          ),
          from: (val) => parseFloat(val.replace(/,/g, ""))
        };
        if ((_a = this.concatOptions) == null ? void 0 : _a.tooltips) this.concatOptions.tooltips = this.format;
      }
      setDisabled() {
        this.el.setAttribute("disabled", "disabled");
        this.el.classList.add("disabled");
      }
      // Public methods
      destroy() {
        this.el.noUiSlider.destroy();
        this.format = null;
        window.$hsRangeSliderCollection = window.$hsRangeSliderCollection.filter(
          ({ element }) => element.el !== this.el
        );
      }
      // Static methods
      static getInstance(target, isInstance = false) {
        const elInCollection = window.$hsRangeSliderCollection.find(
          (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
        );
        return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
      }
      static autoInit() {
        if (!window.$hsRangeSliderCollection) window.$hsRangeSliderCollection = [];
        if (window.$hsRangeSliderCollection)
          window.$hsRangeSliderCollection = window.$hsRangeSliderCollection.filter(
            ({ element }) => document.contains(element.el)
          );
        document.querySelectorAll("[data-hs-range-slider]:not(.--prevent-on-load-init)").forEach((el) => {
          if (!window.$hsRangeSliderCollection.find(
            (elC) => {
              var _a;
              return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
            }
          ))
            new _HSRangeSlider(el);
        });
      }
    };
    window.addEventListener("load", () => {
      HSRangeSlider.autoInit();
    });
    if (typeof window !== "undefined") {
      window.HSRangeSlider = HSRangeSlider;
    }
    range_slider_default = HSRangeSlider;
  }
});

// node_modules/preline/src/plugins/copy-markup/index.ts
init_utils();
init_base_plugin();
var HSCopyMarkup = class _HSCopyMarkup extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "targetSelector");
    __publicField(this, "wrapperSelector");
    __publicField(this, "limit");
    __publicField(this, "target");
    __publicField(this, "wrapper");
    __publicField(this, "items");
    __publicField(this, "onElementClickListener");
    __publicField(this, "onDeleteItemButtonClickListener");
    const data = el.getAttribute("data-hs-copy-markup");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.targetSelector = (concatOptions == null ? void 0 : concatOptions.targetSelector) || null;
    this.wrapperSelector = (concatOptions == null ? void 0 : concatOptions.wrapperSelector) || null;
    this.limit = (concatOptions == null ? void 0 : concatOptions.limit) || null;
    this.items = [];
    if (this.targetSelector) this.init();
  }
  elementClick() {
    this.copy();
  }
  deleteItemButtonClick(item) {
    this.delete(item);
  }
  init() {
    this.createCollection(window.$hsCopyMarkupCollection, this);
    this.onElementClickListener = () => this.elementClick();
    this.setTarget();
    this.setWrapper();
    this.addPredefinedItems();
    this.el.addEventListener("click", this.onElementClickListener);
  }
  copy() {
    if (this.limit && this.items.length >= this.limit) return false;
    if (this.el.hasAttribute("disabled")) this.el.setAttribute("disabled", "");
    const copiedElement = this.target.cloneNode(true);
    this.addToItems(copiedElement);
    if (this.limit && this.items.length >= this.limit)
      this.el.setAttribute("disabled", "disabled");
    this.fireEvent("copy", copiedElement);
    dispatch("copy.hs.copyMarkup", copiedElement, copiedElement);
  }
  addPredefinedItems() {
    Array.from(this.wrapper.children).filter(
      (el) => !el.classList.contains("[--ignore-for-count]")
    ).forEach((el) => {
      this.addToItems(el);
    });
    if (this.limit && this.items.length >= this.limit)
      this.el.setAttribute("disabled", "disabled");
  }
  setTarget() {
    const target = typeof this.targetSelector === "string" ? document.querySelector(this.targetSelector).cloneNode(true) : this.targetSelector.cloneNode(true);
    target.removeAttribute("id");
    this.target = target;
  }
  setWrapper() {
    this.wrapper = typeof this.wrapperSelector === "string" ? document.querySelector(this.wrapperSelector) : this.wrapperSelector;
  }
  addToItems(item) {
    const deleteItemButton = item.querySelector(
      "[data-hs-copy-markup-delete-item]"
    );
    if (this.wrapper) this.wrapper.append(item);
    else this.el.before(item);
    if (deleteItemButton) {
      this.onDeleteItemButtonClickListener = () => this.deleteItemButtonClick(item);
      deleteItemButton.addEventListener(
        "click",
        this.onDeleteItemButtonClickListener
      );
    }
    this.items.push(item);
  }
  // Public methods
  delete(target) {
    const index = this.items.indexOf(target);
    if (index !== -1) this.items.splice(index, 1);
    target.remove();
    this.fireEvent("delete", target);
    dispatch("delete.hs.copyMarkup", target, target);
  }
  destroy() {
    const deleteItemButtons = this.wrapper.querySelectorAll(
      "[data-hs-copy-markup-delete-item]"
    );
    this.el.removeEventListener("click", this.onElementClickListener);
    if (deleteItemButtons.length) {
      deleteItemButtons.forEach(
        (el) => el.removeEventListener("click", this.onDeleteItemButtonClickListener)
      );
    }
    this.el.removeAttribute("disabled");
    this.target = null;
    this.wrapper = null;
    this.items = null;
    window.$hsCopyMarkupCollection = window.$hsCopyMarkupCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static method
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsCopyMarkupCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsCopyMarkupCollection) window.$hsCopyMarkupCollection = [];
    if (window.$hsCopyMarkupCollection)
      window.$hsCopyMarkupCollection = window.$hsCopyMarkupCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-copy-markup]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsCopyMarkupCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      )) {
        const data = el.getAttribute("data-hs-copy-markup");
        const options = data ? JSON.parse(data) : {};
        new _HSCopyMarkup(el, options);
      }
    });
  }
};
window.addEventListener("load", () => {
  HSCopyMarkup.autoInit();
});
if (typeof window !== "undefined") {
  window.HSCopyMarkup = HSCopyMarkup;
}
var copy_markup_default = HSCopyMarkup;

// node_modules/preline/src/plugins/accordion/index.ts
init_utils();
init_base_plugin();
var _HSAccordion = class _HSAccordion extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "toggle");
    __publicField(this, "content");
    __publicField(this, "group");
    __publicField(this, "isAlwaysOpened");
    __publicField(this, "isToggleStopPropagated");
    __publicField(this, "onToggleClickListener");
    this.toggle = this.el.querySelector(".hs-accordion-toggle") || null;
    this.content = this.el.querySelector(".hs-accordion-content") || null;
    this.update();
    this.isToggleStopPropagated = stringToBoolean(
      getClassProperty(this.toggle, "--stop-propagation", "false") || "false"
    );
    if (this.toggle && this.content) this.init();
  }
  init() {
    this.createCollection(window.$hsAccordionCollection, this);
    this.onToggleClickListener = (evt) => this.toggleClick(evt);
    this.toggle.addEventListener("click", this.onToggleClickListener);
  }
  // Public methods
  toggleClick(evt) {
    if (this.isToggleStopPropagated) evt.stopPropagation();
    if (this.el.classList.contains("active")) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    var _a;
    if (this.group && !this.isAlwaysOpened && this.group.querySelector(":scope > .hs-accordion.active") && this.group.querySelector(":scope > .hs-accordion.active") !== this.el) {
      const currentlyOpened = window.$hsAccordionCollection.find(
        (el) => el.element.el === this.group.querySelector(":scope > .hs-accordion.active")
      );
      currentlyOpened.element.hide();
    }
    if (this.el.classList.contains("active")) return false;
    this.el.classList.add("active");
    if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "true";
    this.content.style.display = "block";
    this.content.style.height = "0";
    setTimeout(() => {
      this.content.style.height = `${this.content.scrollHeight}px`;
      afterTransition(this.content, () => {
        this.content.style.display = "block";
        this.content.style.height = "";
        this.fireEvent("open", this.el);
        dispatch("open.hs.accordion", this.el, this.el);
      });
    });
  }
  hide() {
    var _a;
    if (!this.el.classList.contains("active")) return false;
    this.el.classList.remove("active");
    if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "false";
    this.content.style.height = `${this.content.scrollHeight}px`;
    setTimeout(() => {
      this.content.style.height = "0";
    });
    afterTransition(this.content, () => {
      this.content.style.display = "none";
      this.content.style.height = "";
      this.fireEvent("close", this.el);
      dispatch("close.hs.accordion", this.el, this.el);
    });
  }
  update() {
    this.group = this.el.closest(".hs-accordion-group") || null;
    if (!this.group) return false;
    this.isAlwaysOpened = this.group.hasAttribute("data-hs-accordion-always-open") || false;
    window.$hsAccordionCollection.map((el) => {
      if (el.id === this.el.id) {
        el.element.group = this.group;
        el.element.isAlwaysOpened = this.isAlwaysOpened;
      }
      return el;
    });
  }
  destroy() {
    var _a;
    if ((_a = _HSAccordion == null ? void 0 : _HSAccordion.selectable) == null ? void 0 : _a.length) {
      _HSAccordion.selectable.forEach((item) => {
        item.listeners.forEach(({ el, listener }) => {
          el.removeEventListener("click", listener);
        });
      });
    }
    if (this.onToggleClickListener) {
      this.toggle.removeEventListener("click", this.onToggleClickListener);
    }
    this.toggle = null;
    this.content = null;
    this.group = null;
    this.onToggleClickListener = null;
    window.$hsAccordionCollection = window.$hsAccordionCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsAccordionCollection.find((el) => {
      if (target instanceof _HSAccordion) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static autoInit() {
    if (!window.$hsAccordionCollection) window.$hsAccordionCollection = [];
    if (window.$hsAccordionCollection) {
      window.$hsAccordionCollection = window.$hsAccordionCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    }
    document.querySelectorAll(".hs-accordion:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsAccordionCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSAccordion(el);
    });
  }
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsAccordionCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static show(target) {
    const instance = _HSAccordion.findInCollection(target);
    if (instance && instance.element.content.style.display !== "block") instance.element.show();
  }
  static hide(target) {
    const instance = _HSAccordion.findInCollection(target);
    const style = instance ? window.getComputedStyle(instance.element.content) : null;
    if (instance && style.display !== "none") instance.element.hide();
  }
  static treeView() {
    if (!document.querySelectorAll(".hs-accordion-treeview-root").length)
      return false;
    this.selectable = [];
    document.querySelectorAll(".hs-accordion-treeview-root").forEach((el) => {
      const data = el == null ? void 0 : el.getAttribute("data-hs-accordion-options");
      const options = data ? JSON.parse(data) : {};
      this.selectable.push({
        el,
        options: { ...options },
        listeners: []
      });
    });
    if (this.selectable.length)
      this.selectable.forEach((item) => {
        const { el } = item;
        el.querySelectorAll(".hs-accordion-selectable").forEach(
          (_el) => {
            const listener = (evt) => this.onSelectableClick(evt, item, _el);
            _el.addEventListener("click", listener);
            item.listeners.push({ el: _el, listener });
          }
        );
      });
  }
  static toggleSelected(root, item) {
    if (item.classList.contains("selected")) item.classList.remove("selected");
    else {
      root.el.querySelectorAll(".hs-accordion-selectable").forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
    }
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSAccordion.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
__publicField(_HSAccordion, "selectable");
__publicField(_HSAccordion, "onSelectableClick", (evt, item, el) => {
  evt.stopPropagation();
  _HSAccordion.toggleSelected(item, el);
});
var HSAccordion = _HSAccordion;
window.addEventListener("load", () => {
  HSAccordion.autoInit();
  if (document.querySelectorAll(".hs-accordion-treeview-root").length)
    HSAccordion.treeView();
});
if (typeof window !== "undefined") {
  window.HSAccordion = HSAccordion;
}
var accordion_default = HSAccordion;

// node_modules/preline/src/plugins/carousel/index.ts
init_utils();
init_base_plugin();

// node_modules/preline/src/constants.ts
var POSITIONS = {
  auto: "auto",
  "auto-start": "auto-start",
  "auto-end": "auto-end",
  top: "top",
  "top-left": "top-start",
  "top-right": "top-end",
  bottom: "bottom",
  "bottom-left": "bottom-start",
  "bottom-right": "bottom-end",
  right: "right",
  "right-start": "right-start",
  "right-end": "right-end",
  left: "left",
  "left-start": "left-start",
  "left-end": "left-end"
};
var DROPDOWN_ACCESSIBILITY_KEY_SET = [
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
  "Home",
  "End",
  "Enter"
];
var TABS_ACCESSIBILITY_KEY_SET = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End"
];
var SELECT_ACCESSIBILITY_KEY_SET = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End",
  "Escape",
  "Enter",
  "Space",
  "Tab"
];
var COMBO_BOX_ACCESSIBILITY_KEY_SET = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End",
  "Escape",
  "Enter"
];
var BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};

// node_modules/preline/src/plugins/carousel/index.ts
var HSCarousel = class _HSCarousel extends HSBasePlugin {
  constructor(el, options) {
    var _a, _b, _c, _d, _e;
    super(el, options);
    __publicField(this, "currentIndex");
    __publicField(this, "loadingClasses");
    __publicField(this, "dotsItemClasses");
    __publicField(this, "isAutoHeight");
    __publicField(this, "isAutoPlay");
    __publicField(this, "isCentered");
    __publicField(this, "isDraggable");
    __publicField(this, "isInfiniteLoop");
    __publicField(this, "isRTL");
    __publicField(this, "isSnap");
    __publicField(this, "hasSnapSpacers");
    __publicField(this, "slidesQty");
    __publicField(this, "speed");
    __publicField(this, "updateDelay");
    __publicField(this, "loadingClassesRemove");
    __publicField(this, "loadingClassesAdd");
    __publicField(this, "afterLoadingClassesAdd");
    __publicField(this, "container");
    __publicField(this, "inner");
    __publicField(this, "slides");
    __publicField(this, "prev");
    __publicField(this, "next");
    __publicField(this, "dots");
    __publicField(this, "dotsItems");
    __publicField(this, "info");
    __publicField(this, "infoTotal");
    __publicField(this, "infoCurrent");
    __publicField(this, "sliderWidth");
    __publicField(this, "timer");
    // Drag events' help variables
    __publicField(this, "isScrolling");
    __publicField(this, "isDragging");
    __publicField(this, "dragStartX");
    __publicField(this, "initialTranslateX");
    // Touch events' help variables
    __publicField(this, "touchX");
    // Resize events' help variables
    __publicField(this, "resizeContainer");
    __publicField(this, "resizeContainerWidth");
    // Listeners
    __publicField(this, "onPrevClickListener");
    __publicField(this, "onNextClickListener");
    __publicField(this, "onContainerScrollListener");
    __publicField(this, "onElementTouchStartListener");
    __publicField(this, "onElementTouchEndListener");
    __publicField(this, "onInnerMouseDownListener");
    __publicField(this, "onInnerTouchStartListener");
    __publicField(this, "onDocumentMouseMoveListener");
    __publicField(this, "onDocumentTouchMoveListener");
    __publicField(this, "onDocumentMouseUpListener");
    __publicField(this, "onDocumentTouchEndListener");
    __publicField(this, "onDotClickListener");
    const data = el.getAttribute("data-hs-carousel");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.currentIndex = concatOptions.currentIndex || 0;
    this.loadingClasses = concatOptions.loadingClasses ? `${concatOptions.loadingClasses}`.split(",") : null;
    this.dotsItemClasses = concatOptions.dotsItemClasses ? concatOptions.dotsItemClasses : null;
    this.isAutoHeight = typeof concatOptions.isAutoHeight !== "undefined" ? concatOptions.isAutoHeight : false;
    this.isAutoPlay = typeof concatOptions.isAutoPlay !== "undefined" ? concatOptions.isAutoPlay : false;
    this.isCentered = typeof concatOptions.isCentered !== "undefined" ? concatOptions.isCentered : false;
    this.isDraggable = typeof concatOptions.isDraggable !== "undefined" ? concatOptions.isDraggable : false;
    this.isInfiniteLoop = typeof concatOptions.isInfiniteLoop !== "undefined" ? concatOptions.isInfiniteLoop : false;
    this.isRTL = typeof concatOptions.isRTL !== "undefined" ? concatOptions.isRTL : false;
    this.isSnap = typeof concatOptions.isSnap !== "undefined" ? concatOptions.isSnap : false;
    this.hasSnapSpacers = typeof concatOptions.hasSnapSpacers !== "undefined" ? concatOptions.hasSnapSpacers : true;
    this.speed = concatOptions.speed || 4e3;
    this.updateDelay = concatOptions.updateDelay || 0;
    this.slidesQty = concatOptions.slidesQty || 1;
    this.loadingClassesRemove = ((_a = this.loadingClasses) == null ? void 0 : _a[0]) ? this.loadingClasses[0].split(" ") : "opacity-0";
    this.loadingClassesAdd = ((_b = this.loadingClasses) == null ? void 0 : _b[1]) ? this.loadingClasses[1].split(" ") : "";
    this.afterLoadingClassesAdd = ((_c = this.loadingClasses) == null ? void 0 : _c[2]) ? this.loadingClasses[2].split(" ") : "";
    this.container = this.el.querySelector(".hs-carousel") || null;
    this.inner = this.el.querySelector(".hs-carousel-body") || null;
    this.slides = this.el.querySelectorAll(".hs-carousel-slide") || [];
    this.prev = this.el.querySelector(".hs-carousel-prev") || null;
    this.next = this.el.querySelector(".hs-carousel-next") || null;
    this.dots = this.el.querySelector(".hs-carousel-pagination") || null;
    this.info = this.el.querySelector(".hs-carousel-info") || null;
    this.infoTotal = ((_d = this == null ? void 0 : this.info) == null ? void 0 : _d.querySelector(".hs-carousel-info-total")) || null;
    this.infoCurrent = ((_e = this == null ? void 0 : this.info) == null ? void 0 : _e.querySelector(".hs-carousel-info-current")) || null;
    this.sliderWidth = this.el.getBoundingClientRect().width;
    this.isDragging = false;
    this.dragStartX = null;
    this.initialTranslateX = null;
    this.touchX = {
      start: 0,
      end: 0
    };
    this.resizeContainer = document.querySelector("body");
    this.resizeContainerWidth = 0;
    this.init();
  }
  setIsSnap() {
    const containerRect = this.container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestElement = null;
    let closestElementIndex = null;
    let closestDistance = Infinity;
    Array.from(this.inner.children).forEach((child) => {
      const childRect = child.getBoundingClientRect();
      const innerContainerRect = this.inner.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2 - innerContainerRect.left;
      const distance = Math.abs(
        containerCenter - (innerContainerRect.left + childCenter)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestElement = child;
      }
    });
    if (closestElement) {
      closestElementIndex = Array.from(this.slides).findIndex(
        (el) => el === closestElement
      );
    }
    this.setIndex(closestElementIndex);
    if (this.dots) this.setCurrentDot();
  }
  prevClick() {
    this.goToPrev();
    if (this.isAutoPlay) {
      this.resetTimer();
      this.setTimer();
    }
  }
  nextClick() {
    this.goToNext();
    if (this.isAutoPlay) {
      this.resetTimer();
      this.setTimer();
    }
  }
  containerScroll() {
    clearTimeout(this.isScrolling);
    this.isScrolling = setTimeout(() => {
      this.setIsSnap();
    }, 100);
  }
  elementTouchStart(evt) {
    this.touchX.start = evt.changedTouches[0].screenX;
  }
  elementTouchEnd(evt) {
    this.touchX.end = evt.changedTouches[0].screenX;
    this.detectDirection();
  }
  innerMouseDown(evt) {
    this.handleDragStart(evt);
  }
  innerTouchStart(evt) {
    this.handleDragStart(evt);
  }
  documentMouseMove(evt) {
    this.handleDragMove(evt);
  }
  documentTouchMove(evt) {
    this.handleDragMove(evt);
  }
  documentMouseUp() {
    this.handleDragEnd();
  }
  documentTouchEnd() {
    this.handleDragEnd();
  }
  dotClick(ind) {
    this.goTo(ind);
    if (this.isAutoPlay) {
      this.resetTimer();
      this.setTimer();
    }
  }
  init() {
    this.createCollection(window.$hsCarouselCollection, this);
    if (this.inner) {
      this.calculateWidth();
      if (this.isDraggable && !this.isSnap) this.initDragHandling();
    }
    if (this.prev) {
      this.onPrevClickListener = () => this.prevClick();
      this.prev.addEventListener("click", this.onPrevClickListener);
    }
    if (this.next) {
      this.onNextClickListener = () => this.nextClick();
      this.next.addEventListener("click", this.onNextClickListener);
    }
    if (this.dots) this.initDots();
    if (this.info) this.buildInfo();
    if (this.slides.length) {
      this.addCurrentClass();
      if (!this.isInfiniteLoop) this.addDisabledClass();
      if (this.isAutoPlay) this.autoPlay();
    }
    setTimeout(() => {
      if (this.isSnap) this.setIsSnap();
      if (this.loadingClassesRemove) {
        if (typeof this.loadingClassesRemove === "string")
          this.inner.classList.remove(this.loadingClassesRemove);
        else this.inner.classList.remove(...this.loadingClassesRemove);
      }
      if (this.loadingClassesAdd) {
        if (typeof this.loadingClassesAdd === "string")
          this.inner.classList.add(this.loadingClassesAdd);
        else this.inner.classList.add(...this.loadingClassesAdd);
      }
      if (this.inner && this.afterLoadingClassesAdd) {
        setTimeout(() => {
          if (typeof this.afterLoadingClassesAdd === "string")
            this.inner.classList.add(this.afterLoadingClassesAdd);
          else this.inner.classList.add(...this.afterLoadingClassesAdd);
        });
      }
    }, 400);
    if (this.isSnap) {
      this.onContainerScrollListener = () => this.containerScroll();
      this.container.addEventListener("scroll", this.onContainerScrollListener);
    }
    this.el.classList.add("init");
    if (!this.isSnap) {
      this.onElementTouchStartListener = (evt) => this.elementTouchStart(evt);
      this.onElementTouchEndListener = (evt) => this.elementTouchEnd(evt);
      this.el.addEventListener("touchstart", this.onElementTouchStartListener);
      this.el.addEventListener("touchend", this.onElementTouchEndListener);
    }
    this.observeResize();
  }
  initDragHandling() {
    const scrollableElement = this.inner;
    this.onInnerMouseDownListener = (evt) => this.innerMouseDown(evt);
    this.onInnerTouchStartListener = (evt) => this.innerTouchStart(evt);
    this.onDocumentMouseMoveListener = (evt) => this.documentMouseMove(evt);
    this.onDocumentTouchMoveListener = (evt) => this.documentTouchMove(evt);
    this.onDocumentMouseUpListener = () => this.documentMouseUp();
    this.onDocumentTouchEndListener = () => this.documentTouchEnd();
    if (scrollableElement) {
      scrollableElement.addEventListener(
        "mousedown",
        this.onInnerMouseDownListener
      );
      scrollableElement.addEventListener(
        "touchstart",
        this.onInnerTouchStartListener,
        { passive: true }
      );
      document.addEventListener("mousemove", this.onDocumentMouseMoveListener);
      document.addEventListener("touchmove", this.onDocumentTouchMoveListener, {
        passive: false
      });
      document.addEventListener("mouseup", this.onDocumentMouseUpListener);
      document.addEventListener("touchend", this.onDocumentTouchEndListener);
    }
  }
  getTranslateXValue() {
    var _a;
    const transformMatrix = window.getComputedStyle(this.inner).transform;
    if (transformMatrix !== "none") {
      const matrixValues = (_a = transformMatrix.match(/matrix.*\((.+)\)/)) == null ? void 0 : _a[1].split(", ");
      if (matrixValues) {
        let translateX = parseFloat(
          matrixValues.length === 6 ? matrixValues[4] : matrixValues[12]
        );
        if (this.isRTL) translateX = -translateX;
        return isNaN(translateX) || translateX === 0 ? 0 : -translateX;
      }
    }
    return 0;
  }
  removeClickEventWhileDragging(evt) {
    evt.preventDefault();
  }
  handleDragStart(evt) {
    evt.preventDefault();
    this.isDragging = true;
    this.dragStartX = this.getEventX(evt);
    this.initialTranslateX = this.isRTL ? this.getTranslateXValue() : -this.getTranslateXValue();
    this.inner.classList.add("dragging");
  }
  handleDragMove(evt) {
    if (!this.isDragging) return;
    this.inner.querySelectorAll("a:not(.prevented-click)").forEach((el) => {
      el.classList.add("prevented-click");
      el.addEventListener("click", this.removeClickEventWhileDragging);
    });
    const currentX = this.getEventX(evt);
    let deltaX = currentX - this.dragStartX;
    if (this.isRTL) deltaX = -deltaX;
    const newTranslateX = this.initialTranslateX + deltaX;
    const newTranslateXFunc = () => {
      let calcWidth = this.sliderWidth * this.slides.length / this.getCurrentSlidesQty() - this.sliderWidth;
      const containerWidth = this.sliderWidth;
      const itemWidth = containerWidth / this.getCurrentSlidesQty();
      const centeredOffset = (containerWidth - itemWidth) / 2;
      const limitStart = this.isCentered ? centeredOffset : 0;
      if (this.isCentered) calcWidth = calcWidth + centeredOffset;
      const limitEnd = -calcWidth;
      if (this.isRTL) {
        if (newTranslateX < limitStart) return limitStart;
        if (newTranslateX > calcWidth) return limitEnd;
        else return -newTranslateX;
      } else {
        if (newTranslateX > limitStart) return limitStart;
        else if (newTranslateX < -calcWidth) return limitEnd;
        else return newTranslateX;
      }
    };
    this.setTranslate(newTranslateXFunc());
  }
  handleDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    const containerWidth = this.sliderWidth;
    const itemWidth = containerWidth / this.getCurrentSlidesQty();
    const currentTranslateX = this.getTranslateXValue();
    let closestIndex = Math.round(currentTranslateX / itemWidth);
    if (this.isRTL) closestIndex = Math.round(currentTranslateX / itemWidth);
    this.inner.classList.remove("dragging");
    setTimeout(() => {
      this.calculateTransform(closestIndex);
      if (this.dots) this.setCurrentDot();
      this.dragStartX = null;
      this.initialTranslateX = null;
      this.inner.querySelectorAll("a.prevented-click").forEach((el) => {
        el.classList.remove("prevented-click");
        el.removeEventListener("click", this.removeClickEventWhileDragging);
      });
    });
  }
  getEventX(event) {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }
  getCurrentSlidesQty() {
    if (typeof this.slidesQty === "object") {
      const windowWidth = document.body.clientWidth;
      let currentRes = 0;
      Object.keys(this.slidesQty).forEach((key) => {
        if (windowWidth >= (typeof key + 1 === "number" ? this.slidesQty[key] : BREAKPOINTS[key]))
          currentRes = this.slidesQty[key];
      });
      return currentRes;
    } else {
      return this.slidesQty;
    }
  }
  buildSnapSpacers() {
    const existingBefore = this.inner.querySelector(".hs-snap-before");
    const existingAfter = this.inner.querySelector(".hs-snap-after");
    if (existingBefore) existingBefore.remove();
    if (existingAfter) existingAfter.remove();
    const containerWidth = this.sliderWidth;
    const itemWidth = containerWidth / this.getCurrentSlidesQty();
    const spacerWidth = containerWidth / 2 - itemWidth / 2;
    const before = htmlToElement(
      `<div class="hs-snap-before" style="height: 100%; width: ${spacerWidth}px"></div>`
    );
    const after = htmlToElement(
      `<div class="hs-snap-after" style="height: 100%; width: ${spacerWidth}px"></div>`
    );
    this.inner.prepend(before);
    this.inner.appendChild(after);
  }
  initDots() {
    if (this.el.querySelectorAll(".hs-carousel-pagination-item").length)
      this.setDots();
    else this.buildDots();
    if (this.dots) this.setCurrentDot();
  }
  buildDots() {
    this.dots.innerHTML = "";
    const slidesQty = !this.isCentered && this.slidesQty ? this.slides.length - (this.getCurrentSlidesQty() - 1) : this.slides.length;
    for (let i = 0; i < slidesQty; i++) {
      const singleDot = this.buildSingleDot(i);
      this.dots.append(singleDot);
    }
  }
  setDots() {
    this.dotsItems = this.dots.querySelectorAll(".hs-carousel-pagination-item");
    this.dotsItems.forEach((dot, ind) => {
      const targetIndex = dot.getAttribute(
        "data-carousel-pagination-item-target"
      );
      this.singleDotEvents(dot, targetIndex ? +targetIndex : ind);
    });
  }
  goToCurrentDot() {
    const container = this.dots;
    const containerRect = container.getBoundingClientRect();
    const containerScrollLeft = container.scrollLeft;
    const containerScrollTop = container.scrollTop;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const item = this.dotsItems[this.currentIndex];
    const itemRect = item.getBoundingClientRect();
    const itemLeft = itemRect.left - containerRect.left + containerScrollLeft;
    const itemRight = itemLeft + item.clientWidth;
    const itemTop = itemRect.top - containerRect.top + containerScrollTop;
    const itemBottom = itemTop + item.clientHeight;
    let scrollLeft = containerScrollLeft;
    let scrollTop = containerScrollTop;
    if (itemLeft < containerScrollLeft || itemRight > containerScrollLeft + containerWidth) {
      scrollLeft = itemRight - containerWidth;
    }
    if (itemTop < containerScrollTop || itemBottom > containerScrollTop + containerHeight) {
      scrollTop = itemBottom - containerHeight;
    }
    container.scrollTo({
      left: scrollLeft,
      top: scrollTop,
      behavior: "smooth"
    });
  }
  buildInfo() {
    if (this.infoTotal) this.setInfoTotal();
    if (this.infoCurrent) this.setInfoCurrent();
  }
  setInfoTotal() {
    this.infoTotal.innerText = `${this.slides.length}`;
  }
  setInfoCurrent() {
    this.infoCurrent.innerText = `${this.currentIndex + 1}`;
  }
  buildSingleDot(ind) {
    const singleDot = htmlToElement("<span></span>");
    if (this.dotsItemClasses) classToClassList(this.dotsItemClasses, singleDot);
    this.singleDotEvents(singleDot, ind);
    return singleDot;
  }
  singleDotEvents(dot, ind) {
    this.onDotClickListener = () => this.dotClick(ind);
    dot.addEventListener("click", this.onDotClickListener);
  }
  observeResize() {
    const resizeObserver = new ResizeObserver(
      debounce((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width;
          if (newWidth !== this.resizeContainerWidth) {
            this.recalculateWidth();
            if (this.dots) this.initDots();
            this.addCurrentClass();
            this.resizeContainerWidth = newWidth;
          }
        }
      }, this.updateDelay)
    );
    resizeObserver.observe(this.resizeContainer);
  }
  calculateWidth() {
    if (!this.isSnap)
      this.inner.style.width = `${this.sliderWidth * this.slides.length / this.getCurrentSlidesQty()}px`;
    this.slides.forEach((el) => {
      el.style.width = `${this.sliderWidth / this.getCurrentSlidesQty()}px`;
    });
    this.calculateTransform();
  }
  addCurrentClass() {
    if (this.isSnap) {
      const itemsQty = Math.floor(this.getCurrentSlidesQty() / 2);
      for (let i = 0; i < this.slides.length; i++) {
        const slide = this.slides[i];
        if (i <= this.currentIndex + itemsQty && i >= this.currentIndex - itemsQty)
          slide.classList.add("active");
        else slide.classList.remove("active");
      }
    } else {
      const maxIndex = this.isCentered ? this.currentIndex + this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.currentIndex + this.getCurrentSlidesQty();
      this.slides.forEach((el, i) => {
        if (i >= this.currentIndex && i < maxIndex) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    }
  }
  setCurrentDot() {
    const toggleDotActive = (el, i) => {
      let statement = false;
      const itemsQty = Math.floor(this.getCurrentSlidesQty() / 2);
      if (this.isSnap && !this.hasSnapSpacers) {
        statement = i === (this.getCurrentSlidesQty() % 2 === 0 ? this.currentIndex - itemsQty + 1 : this.currentIndex - itemsQty);
      } else statement = i === this.currentIndex;
      if (statement) el.classList.add("active");
      else el.classList.remove("active");
    };
    if (this.dotsItems)
      this.dotsItems.forEach((el, i) => toggleDotActive(el, i));
    else
      this.dots.querySelectorAll(":scope > *").forEach((el, i) => toggleDotActive(el, i));
  }
  setElementToDisabled(el) {
    el.classList.add("disabled");
    if (el.tagName === "BUTTON" || el.tagName === "INPUT")
      el.setAttribute("disabled", "disabled");
  }
  unsetElementToDisabled(el) {
    el.classList.remove("disabled");
    if (el.tagName === "BUTTON" || el.tagName === "INPUT")
      el.removeAttribute("disabled");
  }
  addDisabledClass() {
    if (!this.prev || !this.next) return false;
    const gapValue = getComputedStyle(this.inner).getPropertyValue("gap");
    const itemsQty = Math.floor(this.getCurrentSlidesQty() / 2);
    let currentIndex = 0;
    let maxIndex = 0;
    let statementPrev = false;
    let statementNext = false;
    if (this.isSnap) {
      currentIndex = this.currentIndex;
      maxIndex = this.hasSnapSpacers ? this.slides.length - 1 : this.slides.length - itemsQty - 1;
      statementPrev = this.hasSnapSpacers ? currentIndex === 0 : this.getCurrentSlidesQty() % 2 === 0 ? currentIndex - itemsQty < 0 : currentIndex - itemsQty === 0;
      statementNext = currentIndex >= maxIndex && this.container.scrollLeft + this.container.clientWidth + (parseFloat(gapValue) || 0) >= this.container.scrollWidth;
    } else {
      currentIndex = this.currentIndex;
      maxIndex = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty();
      statementPrev = currentIndex === 0;
      statementNext = currentIndex >= maxIndex;
    }
    if (statementPrev) {
      this.unsetElementToDisabled(this.next);
      this.setElementToDisabled(this.prev);
    } else if (statementNext) {
      this.unsetElementToDisabled(this.prev);
      this.setElementToDisabled(this.next);
    } else {
      this.unsetElementToDisabled(this.prev);
      this.unsetElementToDisabled(this.next);
    }
  }
  autoPlay() {
    this.setTimer();
  }
  setTimer() {
    this.timer = setInterval(() => {
      if (this.currentIndex === this.slides.length - 1) this.goTo(0);
      else this.goToNext();
    }, this.speed);
  }
  resetTimer() {
    clearInterval(this.timer);
  }
  detectDirection() {
    const { start: start2, end: end2 } = this.touchX;
    if (end2 < start2) this.goToNext();
    if (end2 > start2) this.goToPrev();
  }
  calculateTransform(currentIdx) {
    if (currentIdx !== void 0) this.currentIndex = currentIdx;
    if (this.currentIndex > this.slides.length - this.getCurrentSlidesQty() && !this.isCentered)
      this.currentIndex = this.slides.length - this.getCurrentSlidesQty();
    const containerWidth = this.sliderWidth;
    const itemWidth = containerWidth / this.getCurrentSlidesQty();
    let translateX = this.currentIndex * itemWidth;
    if (this.isSnap && !this.isCentered) {
      if (this.container.scrollLeft < containerWidth && this.container.scrollLeft + itemWidth / 2 > containerWidth)
        this.container.scrollLeft = this.container.scrollWidth;
    }
    if (this.isCentered && !this.isSnap) {
      const centeredOffset = (containerWidth - itemWidth) / 2;
      if (this.currentIndex === 0) translateX = -centeredOffset;
      else if (this.currentIndex >= this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1)) {
        const totalSlideWidth = this.slides.length * itemWidth;
        translateX = totalSlideWidth - containerWidth + centeredOffset;
      } else translateX = this.currentIndex * itemWidth - centeredOffset;
    }
    if (!this.isSnap)
      this.inner.style.transform = this.isRTL ? `translate(${translateX}px, 0px)` : `translate(${-translateX}px, 0px)`;
    if (this.isAutoHeight)
      this.inner.style.height = `${this.slides[this.currentIndex].clientHeight}px`;
    if (this.dotsItems) this.goToCurrentDot();
    this.addCurrentClass();
    if (!this.isInfiniteLoop) this.addDisabledClass();
    if (this.isSnap && this.hasSnapSpacers) this.buildSnapSpacers();
    if (this.infoCurrent) this.setInfoCurrent();
  }
  setTranslate(val) {
    this.inner.style.transform = this.isRTL ? `translate(${-val}px, 0px)` : `translate(${val}px, 0px)`;
  }
  setIndex(i) {
    this.currentIndex = i;
    this.addCurrentClass();
    if (!this.isInfiniteLoop) this.addDisabledClass();
  }
  // Public methods
  recalculateWidth() {
    this.sliderWidth = this.inner.parentElement.getBoundingClientRect().width;
    this.calculateWidth();
    if (this.sliderWidth !== this.inner.parentElement.getBoundingClientRect().width)
      this.recalculateWidth();
  }
  goToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.slides.length - this.getCurrentSlidesQty();
    }
    if (this.isSnap) {
      const itemWidth = this.sliderWidth / this.getCurrentSlidesQty();
      this.container.scrollBy({
        left: Math.max(-this.container.scrollLeft, -itemWidth),
        behavior: "smooth"
      });
      this.addCurrentClass();
      if (!this.isInfiniteLoop) this.addDisabledClass();
    } else this.calculateTransform();
    if (this.dots) this.setCurrentDot();
  }
  goToNext() {
    const statement = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty();
    if (this.currentIndex < statement) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    if (this.isSnap) {
      const itemWidth = this.sliderWidth / this.getCurrentSlidesQty();
      const maxScrollLeft = this.container.scrollWidth - this.container.clientWidth;
      this.container.scrollBy({
        left: Math.min(itemWidth, maxScrollLeft - this.container.scrollLeft),
        behavior: "smooth"
      });
      this.addCurrentClass();
      if (!this.isInfiniteLoop) this.addDisabledClass();
    } else this.calculateTransform();
    if (this.dots) this.setCurrentDot();
  }
  goTo(i) {
    const currentIndex = this.currentIndex;
    this.currentIndex = i;
    if (this.isSnap) {
      const itemWidth = this.sliderWidth / this.getCurrentSlidesQty();
      const index = currentIndex > this.currentIndex ? currentIndex - this.currentIndex : this.currentIndex - currentIndex;
      const width = currentIndex > this.currentIndex ? -(itemWidth * index) : itemWidth * index;
      this.container.scrollBy({
        left: width,
        behavior: "smooth"
      });
      this.addCurrentClass();
      if (!this.isInfiniteLoop) this.addDisabledClass();
    } else this.calculateTransform();
    if (this.dots) this.setCurrentDot();
  }
  destroy() {
    var _a, _b;
    if (this.loadingClassesAdd) {
      if (typeof this.loadingClassesAdd === "string")
        this.inner.classList.remove(this.loadingClassesAdd);
      else this.inner.classList.remove(...this.loadingClassesAdd);
    }
    if (this.inner && this.afterLoadingClassesAdd) {
      setTimeout(() => {
        if (typeof this.afterLoadingClassesAdd === "string")
          this.inner.classList.remove(this.afterLoadingClassesAdd);
        else this.inner.classList.remove(...this.afterLoadingClassesAdd);
      });
    }
    this.el.classList.remove("init");
    this.inner.classList.remove("dragging");
    this.slides.forEach((el) => el.classList.remove("active"));
    if ((_a = this == null ? void 0 : this.dotsItems) == null ? void 0 : _a.length)
      this.dotsItems.forEach((el) => el.classList.remove("active"));
    this.prev.classList.remove("disabled");
    this.next.classList.remove("disabled");
    this.inner.style.width = "";
    this.slides.forEach((el) => el.style.width = "");
    if (!this.isSnap) this.inner.style.transform = "";
    if (this.isAutoHeight) this.inner.style.height = "";
    this.prev.removeEventListener("click", this.onPrevClickListener);
    this.next.removeEventListener("click", this.onNextClickListener);
    this.container.removeEventListener(
      "scroll",
      this.onContainerScrollListener
    );
    this.el.removeEventListener("touchstart", this.onElementTouchStartListener);
    this.el.removeEventListener("touchend", this.onElementTouchEndListener);
    this.inner.removeEventListener("mousedown", this.onInnerMouseDownListener);
    this.inner.removeEventListener(
      "touchstart",
      this.onInnerTouchStartListener
    );
    document.removeEventListener("mousemove", this.onDocumentMouseMoveListener);
    document.removeEventListener("touchmove", this.onDocumentTouchMoveListener);
    document.removeEventListener("mouseup", this.onDocumentMouseUpListener);
    document.removeEventListener("touchend", this.onDocumentTouchEndListener);
    this.inner.querySelectorAll("a:not(.prevented-click)").forEach((el) => {
      el.classList.remove("prevented-click");
      el.removeEventListener("click", this.removeClickEventWhileDragging);
    });
    if (((_b = this == null ? void 0 : this.dotsItems) == null ? void 0 : _b.length) || this.dots.querySelectorAll(":scope > *").length) {
      const dots = (this == null ? void 0 : this.dotsItems) || this.dots.querySelectorAll(":scope > *");
      dots.forEach(
        (el) => el.removeEventListener("click", this.onDotClickListener)
      );
      this.dots.innerHTML = null;
    }
    this.inner.querySelector(".hs-snap-before").remove();
    this.inner.querySelector(".hs-snap-after").remove();
    this.dotsItems = null;
    this.isDragging = false;
    this.dragStartX = null;
    this.initialTranslateX = null;
    window.$hsCarouselCollection = window.$hsCarouselCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsCarouselCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsCarouselCollection) window.$hsCarouselCollection = [];
    if (window.$hsCarouselCollection)
      window.$hsCarouselCollection = window.$hsCarouselCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-carousel]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsCarouselCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSCarousel(el);
    });
  }
};
window.addEventListener("load", () => {
  HSCarousel.autoInit();
});
if (typeof window !== "undefined") {
  window.HSCarousel = HSCarousel;
}
var carousel_default = HSCarousel;

// node_modules/preline/src/plugins/collapse/index.ts
init_utils();
init_base_plugin();
var HSCollapse = class _HSCollapse extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "contentId");
    __publicField(this, "content");
    __publicField(this, "animationInProcess");
    __publicField(this, "onElementClickListener");
    this.contentId = this.el.dataset.hsCollapse;
    this.content = document.querySelector(this.contentId);
    this.animationInProcess = false;
    if (this.content) this.init();
  }
  elementClick() {
    if (this.content.classList.contains("open")) {
      this.hide();
    } else {
      this.show();
    }
  }
  init() {
    var _a;
    this.createCollection(window.$hsCollapseCollection, this);
    this.onElementClickListener = () => this.elementClick();
    if ((_a = this == null ? void 0 : this.el) == null ? void 0 : _a.ariaExpanded) {
      if (this.el.classList.contains("open")) this.el.ariaExpanded = "true";
      else this.el.ariaExpanded = "false";
    }
    this.el.addEventListener("click", this.onElementClickListener);
  }
  hideAllMegaMenuItems() {
    this.content.querySelectorAll(".hs-mega-menu-content.block").forEach((el) => {
      el.classList.remove("block");
      el.classList.add("hidden");
    });
  }
  // Public methods
  show() {
    var _a;
    if (this.animationInProcess || this.el.classList.contains("open"))
      return false;
    this.animationInProcess = true;
    this.el.classList.add("open");
    if ((_a = this == null ? void 0 : this.el) == null ? void 0 : _a.ariaExpanded) this.el.ariaExpanded = "true";
    this.content.classList.add("open");
    this.content.classList.remove("hidden");
    this.content.style.height = "0";
    setTimeout(() => {
      this.content.style.height = `${this.content.scrollHeight}px`;
      this.fireEvent("beforeOpen", this.el);
      dispatch("beforeOpen.hs.collapse", this.el, this.el);
    });
    afterTransition(this.content, () => {
      this.content.style.height = "";
      this.fireEvent("open", this.el);
      dispatch("open.hs.collapse", this.el, this.el);
      this.animationInProcess = false;
    });
  }
  hide() {
    var _a;
    if (this.animationInProcess || !this.el.classList.contains("open"))
      return false;
    this.animationInProcess = true;
    this.el.classList.remove("open");
    if ((_a = this == null ? void 0 : this.el) == null ? void 0 : _a.ariaExpanded) this.el.ariaExpanded = "false";
    this.content.style.height = `${this.content.scrollHeight}px`;
    setTimeout(() => {
      this.content.style.height = "0";
    });
    this.content.classList.remove("open");
    afterTransition(this.content, () => {
      this.content.classList.add("hidden");
      this.content.style.height = "";
      this.fireEvent("hide", this.el);
      dispatch("hide.hs.collapse", this.el, this.el);
      this.animationInProcess = false;
    });
    if (this.content.querySelectorAll(".hs-mega-menu-content.block").length) {
      this.hideAllMegaMenuItems();
    }
  }
  destroy() {
    this.el.removeEventListener("click", this.onElementClickListener);
    this.content = null;
    this.animationInProcess = false;
    window.$hsCollapseCollection = window.$hsCollapseCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsCollapseCollection.find((el) => {
      if (target instanceof _HSCollapse) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance = false) {
    const elInCollection = window.$hsCollapseCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsCollapseCollection) window.$hsCollapseCollection = [];
    if (window.$hsCollapseCollection)
      window.$hsCollapseCollection = window.$hsCollapseCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsCollapseCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSCollapse(el);
    });
  }
  static show(target) {
    const instance = _HSCollapse.findInCollection(target);
    if (instance && instance.element.content.classList.contains("hidden")) instance.element.show();
  }
  static hide(target) {
    const instance = _HSCollapse.findInCollection(target);
    if (instance && !instance.element.content.classList.contains("hidden")) instance.element.hide();
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSCollapse.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
window.addEventListener("load", () => {
  HSCollapse.autoInit();
});
if (typeof window !== "undefined") {
  window.HSCollapse = HSCollapse;
}
var collapse_default = HSCollapse;

// node_modules/preline/src/plugins/combobox/index.ts
init_utils();
init_base_plugin();
var HSComboBox = class _HSComboBox extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "gap");
    __publicField(this, "viewport");
    __publicField(this, "preventVisibility");
    __publicField(this, "minSearchLength");
    __publicField(this, "apiUrl");
    __publicField(this, "apiDataPart");
    __publicField(this, "apiQuery");
    __publicField(this, "apiSearchQuery");
    __publicField(this, "apiSearchPath");
    __publicField(this, "apiSearchDefaultPath");
    __publicField(this, "apiHeaders");
    __publicField(this, "apiGroupField");
    __publicField(this, "outputItemTemplate");
    __publicField(this, "outputEmptyTemplate");
    __publicField(this, "outputLoaderTemplate");
    __publicField(this, "groupingType");
    __publicField(this, "groupingTitleTemplate");
    __publicField(this, "tabsWrapperTemplate");
    __publicField(this, "preventSelection");
    __publicField(this, "preventAutoPosition");
    __publicField(this, "isOpenOnFocus");
    __publicField(this, "input");
    __publicField(this, "output");
    __publicField(this, "itemsWrapper");
    __publicField(this, "items");
    __publicField(this, "tabs");
    __publicField(this, "toggle");
    __publicField(this, "toggleClose");
    __publicField(this, "toggleOpen");
    __publicField(this, "outputPlaceholder");
    __publicField(this, "outputLoader");
    __publicField(this, "value");
    __publicField(this, "selected");
    __publicField(this, "currentData");
    __publicField(this, "groups");
    __publicField(this, "selectedGroup");
    __publicField(this, "isOpened");
    __publicField(this, "isCurrent");
    __publicField(this, "animationInProcess");
    __publicField(this, "isSearchLengthExceeded", false);
    __publicField(this, "onInputFocusListener");
    __publicField(this, "onInputInputListener");
    __publicField(this, "onToggleClickListener");
    __publicField(this, "onToggleCloseClickListener");
    __publicField(this, "onToggleOpenClickListener");
    const data = el.getAttribute("data-hs-combo-box");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.gap = 5;
    this.viewport = (typeof (concatOptions == null ? void 0 : concatOptions.viewport) === "string" ? document.querySelector(concatOptions == null ? void 0 : concatOptions.viewport) : concatOptions == null ? void 0 : concatOptions.viewport) ?? null;
    this.preventVisibility = (concatOptions == null ? void 0 : concatOptions.preventVisibility) ?? false;
    this.minSearchLength = (concatOptions == null ? void 0 : concatOptions.minSearchLength) ?? 0;
    this.apiUrl = (concatOptions == null ? void 0 : concatOptions.apiUrl) ?? null;
    this.apiDataPart = (concatOptions == null ? void 0 : concatOptions.apiDataPart) ?? null;
    this.apiQuery = (concatOptions == null ? void 0 : concatOptions.apiQuery) ?? null;
    this.apiSearchQuery = (concatOptions == null ? void 0 : concatOptions.apiSearchQuery) ?? null;
    this.apiSearchPath = (concatOptions == null ? void 0 : concatOptions.apiSearchPath) ?? null;
    this.apiSearchDefaultPath = (concatOptions == null ? void 0 : concatOptions.apiSearchDefaultPath) ?? null;
    this.apiHeaders = (concatOptions == null ? void 0 : concatOptions.apiHeaders) ?? {};
    this.apiGroupField = (concatOptions == null ? void 0 : concatOptions.apiGroupField) ?? null;
    this.outputItemTemplate = (concatOptions == null ? void 0 : concatOptions.outputItemTemplate) ?? `<div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" data-hs-combo-box-output-item>
				<div class="flex justify-between items-center w-full">
					<span data-hs-combo-box-search-text></span>
					<span class="hidden hs-combo-box-selected:block">
						<svg class="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http:.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</span>
				</div>
			</div>`;
    this.outputEmptyTemplate = (concatOptions == null ? void 0 : concatOptions.outputEmptyTemplate) ?? `<div class="py-2 px-4 w-full text-sm text-gray-800 rounded-lg dark:bg-neutral-900 dark:text-neutral-200">Nothing found...</div>`;
    this.outputLoaderTemplate = (concatOptions == null ? void 0 : concatOptions.outputLoaderTemplate) ?? `<div class="flex justify-center items-center py-2 px-4 text-sm text-gray-800 rounded-lg bg-white dark:bg-neutral-900 dark:text-neutral-200">
				<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
					<span class="sr-only">Loading...</span>
				</div>
			</div>`;
    this.groupingType = (concatOptions == null ? void 0 : concatOptions.groupingType) ?? null;
    this.groupingTitleTemplate = (concatOptions == null ? void 0 : concatOptions.groupingTitleTemplate) ?? (this.groupingType === "default" ? `<div class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500"></div>` : `<button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"></button>`);
    this.tabsWrapperTemplate = (concatOptions == null ? void 0 : concatOptions.tabsWrapperTemplate) ?? `<div class="overflow-x-auto p-4"></div>`;
    this.preventSelection = (concatOptions == null ? void 0 : concatOptions.preventSelection) ?? false;
    this.preventAutoPosition = (concatOptions == null ? void 0 : concatOptions.preventAutoPosition) ?? false;
    this.isOpenOnFocus = (concatOptions == null ? void 0 : concatOptions.isOpenOnFocus) ?? false;
    this.input = this.el.querySelector("[data-hs-combo-box-input]") ?? null;
    this.output = this.el.querySelector("[data-hs-combo-box-output]") ?? null;
    this.itemsWrapper = this.el.querySelector("[data-hs-combo-box-output-items-wrapper]") ?? null;
    this.items = Array.from(this.el.querySelectorAll("[data-hs-combo-box-output-item]")) ?? [];
    this.tabs = [];
    this.toggle = this.el.querySelector("[data-hs-combo-box-toggle]") ?? null;
    this.toggleClose = this.el.querySelector("[data-hs-combo-box-close]") ?? null;
    this.toggleOpen = this.el.querySelector("[data-hs-combo-box-open]") ?? null;
    this.outputPlaceholder = null;
    this.selected = this.value = this.el.querySelector("[data-hs-combo-box-input]").value ?? "";
    this.currentData = null;
    this.isOpened = false;
    this.isCurrent = false;
    this.animationInProcess = false;
    this.selectedGroup = "all";
    this.init();
  }
  inputFocus() {
    if (!this.isOpened) {
      this.setResultAndRender();
      this.open();
    }
  }
  inputInput(evt) {
    const val = evt.target.value.trim();
    if (val.length <= this.minSearchLength) this.setResultAndRender("");
    else this.setResultAndRender(val);
    if (this.input.value !== "") this.el.classList.add("has-value");
    else this.el.classList.remove("has-value");
    if (!this.isOpened) this.open();
  }
  toggleClick() {
    if (this.isOpened) this.close();
    else this.open(this.toggle.getAttribute("data-hs-combo-box-toggle"));
  }
  toggleCloseClick() {
    this.close();
  }
  toggleOpenClick() {
    this.open();
  }
  init() {
    this.createCollection(window.$hsComboBoxCollection, this);
    this.build();
  }
  build() {
    this.buildInput();
    if (this.groupingType) this.setGroups();
    this.buildItems();
    if (this.preventVisibility) {
      if (!this.preventAutoPosition) this.recalculateDirection();
    }
    if (this.toggle) this.buildToggle();
    if (this.toggleClose) this.buildToggleClose();
    if (this.toggleOpen) this.buildToggleOpen();
  }
  getNestedProperty(obj, path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }
  setValue(val, data = null) {
    this.selected = val;
    this.value = val;
    this.input.value = val;
    if (data) this.currentData = data;
    this.fireEvent("select", this.currentData);
    dispatch("select.hs.combobox", this.el, this.currentData);
  }
  setValueAndOpen(val) {
    this.value = val;
    if (this.items.length) {
      this.setItemsVisibility();
    }
  }
  setValueAndClear(val, data = null) {
    if (val) this.setValue(val, data);
    else this.setValue(this.selected, data);
    if (this.outputPlaceholder) this.destroyOutputPlaceholder();
  }
  setSelectedByValue(val) {
    this.items.forEach((el) => {
      if (this.isTextExists(el, val))
        el.classList.add("selected");
      else el.classList.remove("selected");
    });
  }
  setResultAndRender(value = "") {
    let _value = this.preventVisibility ? this.input.value : value;
    this.setResults(_value);
    if (this.apiSearchQuery || this.apiSearchPath || this.apiSearchDefaultPath) this.itemsFromJson();
    if (_value === "") this.isSearchLengthExceeded = true;
    else this.isSearchLengthExceeded = false;
  }
  setResults(val) {
    this.value = val;
    this.resultItems();
    if (this.hasVisibleItems()) this.destroyOutputPlaceholder();
    else this.buildOutputPlaceholder();
  }
  setGroups() {
    const groups = [];
    this.items.forEach((item) => {
      const { group } = JSON.parse(
        item.getAttribute("data-hs-combo-box-output-item")
      );
      if (!groups.some((el) => (el == null ? void 0 : el.name) === group.name)) {
        groups.push(group);
      }
    });
    this.groups = groups;
  }
  setApiGroups(items) {
    const groups = [];
    items.forEach((item) => {
      const group = item[this.apiGroupField];
      if (!groups.some((el) => el.name === group)) {
        groups.push({
          name: group,
          title: group
        });
      }
    });
    this.groups = groups;
  }
  setItemsVisibility() {
    if (this.groupingType === "tabs" && this.selectedGroup !== "all") {
      this.items.forEach((item) => {
        item.style.display = "none";
      });
    }
    const items = this.groupingType === "tabs" ? this.selectedGroup === "all" ? this.items : this.items.filter((f) => {
      const { group } = JSON.parse(
        f.getAttribute("data-hs-combo-box-output-item")
      );
      return group.name === this.selectedGroup;
    }) : this.items;
    if (this.groupingType === "tabs" && this.selectedGroup !== "all") {
      items.forEach((item) => {
        item.style.display = "block";
      });
    }
    items.forEach((item) => {
      if (!this.isTextExistsAny(item, this.value))
        item.style.display = "none";
      else item.style.display = "block";
    });
    if (this.groupingType === "default") {
      this.output.querySelectorAll("[data-hs-combo-box-group-title]").forEach((el) => {
        const g = el.getAttribute("data-hs-combo-box-group-title");
        const items2 = this.items.filter((f) => {
          const { group } = JSON.parse(
            f.getAttribute("data-hs-combo-box-output-item")
          );
          return group.name === g && f.style.display === "block";
        });
        if (items2.length) el.style.display = "block";
        else el.style.display = "none";
      });
    }
  }
  isTextExists(el, val) {
    const lowerCased = val.map((v) => v.toLowerCase());
    return Array.from(
      el.querySelectorAll("[data-hs-combo-box-search-text]")
    ).some(
      (elI) => lowerCased.includes(
        elI.getAttribute("data-hs-combo-box-search-text").toLowerCase()
      )
    );
  }
  isTextExistsAny(el, val) {
    return Array.from(
      el.querySelectorAll("[data-hs-combo-box-search-text]")
    ).some(
      (elI) => elI.getAttribute("data-hs-combo-box-search-text").toLowerCase().includes(val.toLowerCase())
    );
  }
  hasVisibleItems() {
    return this.items.length ? this.items.some((el) => el.style.display === "block") : false;
  }
  valuesBySelector(el) {
    return Array.from(
      el.querySelectorAll("[data-hs-combo-box-search-text]")
    ).reduce(
      (acc, cur) => [
        ...acc,
        cur.getAttribute("data-hs-combo-box-search-text")
      ],
      []
    );
  }
  sortItems() {
    const compareFn = (i1, i2) => {
      const a = i1.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
      const b = i2.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    };
    return this.items.sort(compareFn);
  }
  buildInput() {
    if (this.isOpenOnFocus) {
      this.onInputFocusListener = () => this.inputFocus();
      this.input.addEventListener("focus", this.onInputFocusListener);
    }
    this.onInputInputListener = debounce(
      (evt) => this.inputInput(evt)
    );
    this.input.addEventListener("input", this.onInputInputListener);
  }
  async buildItems() {
    this.output.role = "listbox";
    this.output.tabIndex = -1;
    this.output.ariaOrientation = "vertical";
    if (this.apiUrl) await this.itemsFromJson();
    else {
      if (this.itemsWrapper) this.itemsWrapper.innerHTML = "";
      else this.output.innerHTML = "";
      this.itemsFromHtml();
    }
    if (this.items[0].classList.contains("selected"))
      this.currentData = JSON.parse(this.items[0].getAttribute("data-hs-combo-box-item-stored-data"));
  }
  buildOutputLoader() {
    if (this.outputLoader) return false;
    this.outputLoader = htmlToElement(this.outputLoaderTemplate);
    if (this.items.length || this.outputPlaceholder) {
      this.outputLoader.style.position = "absolute";
      this.outputLoader.style.top = "0";
      this.outputLoader.style.bottom = "0";
      this.outputLoader.style.left = "0";
      this.outputLoader.style.right = "0";
      this.outputLoader.style.zIndex = "2";
    } else {
      this.outputLoader.style.position = "";
      this.outputLoader.style.top = "";
      this.outputLoader.style.bottom = "";
      this.outputLoader.style.left = "";
      this.outputLoader.style.right = "";
      this.outputLoader.style.zIndex = "";
      this.outputLoader.style.height = "30px";
    }
    this.output.append(this.outputLoader);
  }
  buildToggle() {
    var _a, _b, _c, _d;
    if (this.isOpened) {
      if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "true";
      if ((_b = this == null ? void 0 : this.input) == null ? void 0 : _b.ariaExpanded) this.input.ariaExpanded = "true";
    } else {
      if ((_c = this == null ? void 0 : this.toggle) == null ? void 0 : _c.ariaExpanded) this.toggle.ariaExpanded = "false";
      if ((_d = this == null ? void 0 : this.input) == null ? void 0 : _d.ariaExpanded) this.input.ariaExpanded = "false";
    }
    this.onToggleClickListener = () => this.toggleClick();
    this.toggle.addEventListener("click", this.onToggleClickListener);
  }
  buildToggleClose() {
    this.onToggleCloseClickListener = () => this.toggleCloseClick();
    this.toggleClose.addEventListener("click", this.onToggleCloseClickListener);
  }
  buildToggleOpen() {
    this.onToggleOpenClickListener = () => this.toggleOpenClick();
    this.toggleOpen.addEventListener("click", this.onToggleOpenClickListener);
  }
  buildOutputPlaceholder() {
    if (!this.outputPlaceholder)
      this.outputPlaceholder = htmlToElement(this.outputEmptyTemplate);
    this.appendItemsToWrapper(this.outputPlaceholder);
  }
  destroyOutputLoader() {
    if (this.outputLoader) this.outputLoader.remove();
    this.outputLoader = null;
  }
  itemRender(item) {
    const val = item.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
    const data = JSON.parse(item.getAttribute("data-hs-combo-box-item-stored-data")) ?? null;
    if (this.itemsWrapper) this.itemsWrapper.append(item);
    else this.output.append(item);
    if (!this.preventSelection) {
      item.addEventListener("click", () => {
        this.close(val, data);
        this.setSelectedByValue(this.valuesBySelector(item));
      });
    }
  }
  plainRender(items) {
    items.forEach((item) => {
      this.itemRender(item);
    });
  }
  jsonItemsRender(items) {
    items.forEach((item, index) => {
      const newItem = htmlToElement(this.outputItemTemplate);
      newItem.setAttribute("data-hs-combo-box-item-stored-data", JSON.stringify(item));
      newItem.querySelectorAll("[data-hs-combo-box-output-item-field]").forEach((el) => {
        const value = this.getNestedProperty(item, el.getAttribute("data-hs-combo-box-output-item-field"));
        const hideIfEmpty = el.hasAttribute(
          "data-hs-combo-box-output-item-hide-if-empty"
        );
        el.textContent = value ?? "";
        if (!value && hideIfEmpty) el.style.display = "none";
      });
      newItem.querySelectorAll("[data-hs-combo-box-search-text]").forEach((el) => {
        const value = this.getNestedProperty(item, el.getAttribute("data-hs-combo-box-output-item-field"));
        el.setAttribute(
          "data-hs-combo-box-search-text",
          value ?? ""
        );
      });
      newItem.querySelectorAll("[data-hs-combo-box-output-item-attr]").forEach((el) => {
        const attributes = JSON.parse(
          el.getAttribute("data-hs-combo-box-output-item-attr")
        );
        attributes.forEach((attr) => {
          el.setAttribute(attr.attr, item[attr.valueFrom]);
        });
      });
      newItem.setAttribute("tabIndex", `${index}`);
      if (this.groupingType === "tabs" || this.groupingType === "default") {
        newItem.setAttribute(
          "data-hs-combo-box-output-item",
          `{"group": {"name": "${item[this.apiGroupField]}", "title": "${item[this.apiGroupField]}"}}`
        );
      }
      this.items = [...this.items, newItem];
      if (!this.preventSelection) {
        newItem.addEventListener("click", () => {
          this.close(
            newItem.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"),
            JSON.parse(newItem.getAttribute("data-hs-combo-box-item-stored-data"))
          );
          this.setSelectedByValue(this.valuesBySelector(newItem));
        });
      }
      this.appendItemsToWrapper(newItem);
    });
  }
  groupDefaultRender() {
    this.groups.forEach((el) => {
      const title = htmlToElement(this.groupingTitleTemplate);
      title.setAttribute("data-hs-combo-box-group-title", el.name);
      title.classList.add("--exclude-accessibility");
      title.innerText = el.title;
      if (this.itemsWrapper) this.itemsWrapper.append(title);
      else this.output.append(title);
      const items = this.sortItems().filter((f) => {
        const { group } = JSON.parse(
          f.getAttribute("data-hs-combo-box-output-item")
        );
        return group.name === el.name;
      });
      this.plainRender(items);
    });
  }
  groupTabsRender() {
    const tabsScroll = htmlToElement(this.tabsWrapperTemplate);
    const tabsWrapper = htmlToElement(
      `<div class="flex flex-nowrap gap-x-2"></div>`
    );
    tabsScroll.append(tabsWrapper);
    this.output.insertBefore(tabsScroll, this.output.firstChild);
    const tabDef = htmlToElement(this.groupingTitleTemplate);
    tabDef.setAttribute("data-hs-combo-box-group-title", "all");
    tabDef.classList.add("--exclude-accessibility", "active");
    tabDef.innerText = "All";
    this.tabs = [...this.tabs, tabDef];
    tabsWrapper.append(tabDef);
    tabDef.addEventListener("click", () => {
      this.selectedGroup = "all";
      const selectedTab = this.tabs.find(
        (elI) => elI.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup
      );
      this.tabs.forEach((el) => el.classList.remove("active"));
      selectedTab.classList.add("active");
      this.setItemsVisibility();
    });
    this.groups.forEach((el) => {
      const tab = htmlToElement(this.groupingTitleTemplate);
      tab.setAttribute("data-hs-combo-box-group-title", el.name);
      tab.classList.add("--exclude-accessibility");
      tab.innerText = el.title;
      this.tabs = [...this.tabs, tab];
      tabsWrapper.append(tab);
      tab.addEventListener("click", () => {
        this.selectedGroup = el.name;
        const selectedTab = this.tabs.find(
          (elI) => elI.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup
        );
        this.tabs.forEach((el2) => el2.classList.remove("active"));
        selectedTab.classList.add("active");
        this.setItemsVisibility();
      });
    });
  }
  itemsFromHtml() {
    if (this.groupingType === "default") {
      this.groupDefaultRender();
    } else if (this.groupingType === "tabs") {
      const items = this.sortItems();
      this.groupTabsRender();
      this.plainRender(items);
    } else {
      const items = this.sortItems();
      this.plainRender(items);
    }
    this.setResults(this.input.value);
  }
  async itemsFromJson() {
    if (this.isSearchLengthExceeded) return false;
    this.buildOutputLoader();
    try {
      const query = `${this.apiQuery}`;
      let searchQuery;
      let searchPath;
      let url = this.apiUrl;
      if (!this.apiSearchQuery && this.apiSearchPath) {
        if (this.apiSearchDefaultPath && this.value === "") {
          searchPath = `/${this.apiSearchDefaultPath}`;
        } else {
          searchPath = `/${this.apiSearchPath}/${this.value.toLowerCase()}`;
        }
        if (this.apiSearchPath || this.apiSearchDefaultPath) {
          url += searchPath;
        }
      } else {
        searchQuery = `${this.apiSearchQuery}=${this.value.toLowerCase()}`;
        if (this.apiQuery && this.apiSearchQuery) {
          url += `?${searchQuery}&${query}`;
        } else if (this.apiQuery) {
          url += `?${query}`;
        } else if (this.apiSearchQuery) {
          url += `?${searchQuery}`;
        }
      }
      const res = await fetch(url, this.apiHeaders);
      let items = await res.json();
      if (this.apiDataPart) {
        items = items[this.apiDataPart];
      }
      if (this.apiSearchQuery || this.apiSearchPath) {
        this.items = [];
      }
      if (this.itemsWrapper) {
        this.itemsWrapper.innerHTML = "";
      } else {
        this.output.innerHTML = "";
      }
      if (this.groupingType === "tabs") {
        this.setApiGroups(items);
        this.groupTabsRender();
        this.jsonItemsRender(items);
      } else if (this.groupingType === "default") {
        this.setApiGroups(items);
        this.groups.forEach((el) => {
          const title = htmlToElement(this.groupingTitleTemplate);
          title.setAttribute("data-hs-combo-box-group-title", el.name);
          title.classList.add("--exclude-accessibility");
          title.innerText = el.title;
          const newItems = items.filter(
            (i) => i[this.apiGroupField] === el.name
          );
          if (this.itemsWrapper) this.itemsWrapper.append(title);
          else this.output.append(title);
          this.jsonItemsRender(newItems);
        });
      } else {
        this.jsonItemsRender(items);
      }
      this.setResults(this.input.value.length <= this.minSearchLength ? "" : this.input.value);
    } catch (err) {
      console.error(err);
      this.buildOutputPlaceholder();
    }
    this.destroyOutputLoader();
  }
  appendItemsToWrapper(item) {
    if (this.itemsWrapper) {
      this.itemsWrapper.append(item);
    } else {
      this.output.append(item);
    }
  }
  resultItems() {
    if (!this.items.length) return false;
    this.setItemsVisibility();
    this.setSelectedByValue([this.selected]);
  }
  destroyOutputPlaceholder() {
    if (this.outputPlaceholder) this.outputPlaceholder.remove();
    this.outputPlaceholder = null;
  }
  // Public methods
  getCurrentData() {
    return this.currentData;
  }
  setCurrent() {
    if (window.$hsComboBoxCollection.length) {
      window.$hsComboBoxCollection.map((el) => el.element.isCurrent = false);
      this.isCurrent = true;
    }
  }
  open(val) {
    if (this.animationInProcess) return false;
    if (typeof val !== "undefined") this.setValueAndOpen(val);
    if (this.preventVisibility) return false;
    this.animationInProcess = true;
    this.output.style.display = "block";
    if (!this.preventAutoPosition) this.recalculateDirection();
    setTimeout(() => {
      var _a, _b;
      if ((_a = this == null ? void 0 : this.input) == null ? void 0 : _a.ariaExpanded) this.input.ariaExpanded = "true";
      if ((_b = this == null ? void 0 : this.toggle) == null ? void 0 : _b.ariaExpanded) this.toggle.ariaExpanded = "true";
      this.el.classList.add("active");
      this.animationInProcess = false;
    });
    this.isOpened = true;
  }
  close(val, data = null) {
    var _a, _b;
    if (this.animationInProcess) return false;
    if (this.preventVisibility) {
      this.setValueAndClear(val, data);
      if (this.input.value !== "") this.el.classList.add("has-value");
      else this.el.classList.remove("has-value");
      return false;
    }
    this.animationInProcess = true;
    if ((_a = this == null ? void 0 : this.input) == null ? void 0 : _a.ariaExpanded) this.input.ariaExpanded = "false";
    if ((_b = this == null ? void 0 : this.toggle) == null ? void 0 : _b.ariaExpanded) this.toggle.ariaExpanded = "false";
    this.el.classList.remove("active");
    if (!this.preventAutoPosition) {
      this.output.classList.remove("bottom-full", "top-full");
      this.output.style.marginTop = "";
      this.output.style.marginBottom = "";
    }
    afterTransition(this.output, () => {
      this.output.style.display = "none";
      this.setValueAndClear(val, data || null);
      this.animationInProcess = false;
    });
    if (this.input.value !== "") this.el.classList.add("has-value");
    else this.el.classList.remove("has-value");
    this.isOpened = false;
  }
  recalculateDirection() {
    if (isEnoughSpace(
      this.output,
      this.input,
      "bottom",
      this.gap,
      this.viewport
    )) {
      this.output.classList.remove("bottom-full");
      this.output.style.marginBottom = "";
      this.output.classList.add("top-full");
      this.output.style.marginTop = `${this.gap}px`;
    } else {
      this.output.classList.remove("top-full");
      this.output.style.marginTop = "";
      this.output.classList.add("bottom-full");
      this.output.style.marginBottom = `${this.gap}px`;
    }
  }
  destroy() {
    this.input.removeEventListener("focus", this.onInputFocusListener);
    this.input.removeEventListener("input", this.onInputInputListener);
    this.toggle.removeEventListener("click", this.onToggleClickListener);
    if (this.toggleClose)
      this.toggleClose.removeEventListener(
        "click",
        this.onToggleCloseClickListener
      );
    if (this.toggleOpen)
      this.toggleOpen.removeEventListener(
        "click",
        this.onToggleOpenClickListener
      );
    this.el.classList.remove("has-value", "active");
    if (this.items.length)
      this.items.forEach((el) => {
        el.classList.remove("selected");
        el.style.display = "";
      });
    this.output.removeAttribute("role");
    this.output.removeAttribute("tabindex");
    this.output.removeAttribute("aria-orientation");
    if (this.outputLoader) {
      this.outputLoader.remove();
      this.outputLoader = null;
    }
    if (this.outputPlaceholder) {
      this.outputPlaceholder.remove();
      this.outputPlaceholder = null;
    }
    if (this.apiUrl) {
      this.output.innerHTML = "";
    }
    this.items = [];
    window.$hsComboBoxCollection = window.$hsComboBoxCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsComboBoxCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsComboBoxCollection) {
      window.$hsComboBoxCollection = [];
      window.addEventListener("click", (evt) => {
        const evtTarget = evt.target;
        _HSComboBox.closeCurrentlyOpened(evtTarget);
      });
      document.addEventListener(
        "keydown",
        (evt) => _HSComboBox.accessibility(evt)
      );
    }
    if (window.$hsComboBoxCollection)
      window.$hsComboBoxCollection = window.$hsComboBoxCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-combo-box]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsComboBoxCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      )) {
        const data = el.getAttribute("data-hs-combo-box");
        const options = data ? JSON.parse(data) : {};
        new _HSComboBox(el, options);
      }
    });
  }
  static close(target) {
    const elInCollection = window.$hsComboBoxCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    if (elInCollection && elInCollection.element.isOpened) {
      elInCollection.element.close();
    }
  }
  static closeCurrentlyOpened(evtTarget = null) {
    if (!evtTarget.closest("[data-hs-combo-box].active")) {
      const currentlyOpened = window.$hsComboBoxCollection.filter((el) => el.element.isOpened) || null;
      if (currentlyOpened) {
        currentlyOpened.forEach((el) => {
          el.element.close();
        });
      }
    }
  }
  // Accessibility methods
  static getPreparedItems(isReversed = false, output) {
    if (!output) return null;
    const preparedItems = isReversed ? Array.from(
      output.querySelectorAll(":scope > *:not(.--exclude-accessibility)")
    ).filter((el) => el.style.display !== "none").reverse() : Array.from(
      output.querySelectorAll(":scope > *:not(.--exclude-accessibility)")
    ).filter((el) => el.style.display !== "none");
    const items = preparedItems.filter(
      (el) => !el.classList.contains("disabled")
    );
    return items;
  }
  static setHighlighted(prev, current, input) {
    current.focus();
    input.value = current.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
    if (prev) prev.classList.remove("hs-combo-box-output-item-highlighted");
    current.classList.add("hs-combo-box-output-item-highlighted");
  }
  static accessibility(evt) {
    const target = window.$hsComboBoxCollection.find(
      (el) => el.element.preventVisibility ? el.element.isCurrent : el.element.isOpened
    );
    if (target && COMBO_BOX_ACCESSIBILITY_KEY_SET.includes(evt.code) && !evt.metaKey) {
      switch (evt.code) {
        case "Escape":
          evt.preventDefault();
          this.onEscape();
          break;
        case "ArrowUp":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow();
          break;
        case "ArrowDown":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow(false);
          break;
        case "Home":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd();
          break;
        case "End":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd(false);
          break;
        case "Enter":
          evt.preventDefault();
          this.onEnter(evt);
          break;
        default:
          break;
      }
    }
  }
  static onEscape() {
    const target = window.$hsComboBoxCollection.find(
      (el) => !el.element.preventVisibility && el.element.isOpened
    );
    if (target) {
      target.element.close();
      target.element.input.blur();
    }
  }
  static onArrow(isArrowUp = true) {
    const target = window.$hsComboBoxCollection.find(
      (el) => el.element.preventVisibility ? el.element.isCurrent : el.element.isOpened
    );
    if (target) {
      const output = target.element.itemsWrapper ?? target.element.output;
      if (!output) return false;
      const items = _HSComboBox.getPreparedItems(isArrowUp, output);
      const current = output.querySelector(
        ".hs-combo-box-output-item-highlighted"
      );
      let currentItem = null;
      if (!current)
        items[0].classList.add("hs-combo-box-output-item-highlighted");
      let currentInd = items.findIndex((el) => el === current);
      if (currentInd + 1 < items.length) currentInd++;
      currentItem = items[currentInd];
      _HSComboBox.setHighlighted(current, currentItem, target.element.input);
    }
  }
  static onStartEnd(isStart = true) {
    const target = window.$hsComboBoxCollection.find(
      (el) => el.element.preventVisibility ? el.element.isCurrent : el.element.isOpened
    );
    if (target) {
      const output = target.element.itemsWrapper ?? target.element.output;
      if (!output) return false;
      const items = _HSComboBox.getPreparedItems(isStart, output);
      const current = output.querySelector(
        ".hs-combo-box-output-item-highlighted"
      );
      if (items.length)
        _HSComboBox.setHighlighted(
          current,
          items[0],
          target.element.input
        );
    }
  }
  static onEnter(evt) {
    const target = evt.target;
    const opened = window.$hsComboBoxCollection.find(
      (el) => !isParentOrElementHidden(el.element.el) && evt.target.closest("[data-hs-combo-box]") === el.element.el
    );
    const link = opened.element.el.querySelector(
      ".hs-combo-box-output-item-highlighted a"
    );
    if (target.hasAttribute("data-hs-combo-box-input")) {
      opened.element.close();
      target.blur();
    } else {
      if (!opened.element.preventSelection) {
        opened.element.setSelectedByValue(
          opened.element.valuesBySelector(evt.target)
        );
      }
      if (opened.element.preventSelection && link) {
        window.location.assign(link.getAttribute("href"));
      }
      opened.element.close(
        !opened.element.preventSelection ? evt.target.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text") : null,
        JSON.parse(evt.target.getAttribute("data-hs-combo-box-item-stored-data")) ?? null
      );
    }
  }
};
window.addEventListener("load", () => {
  HSComboBox.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsComboBoxCollection) return false;
  const target = window.$hsComboBoxCollection.find((el) => el.element.isOpened);
  if (target && !target.element.preventAutoPosition)
    target.element.recalculateDirection();
});
if (typeof window !== "undefined") {
  window.HSComboBox = HSComboBox;
}
var combobox_default = HSComboBox;

// node_modules/preline/src/plugins/dropdown/index.ts
init_utils();

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce2(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce2(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/preline/src/plugins/dropdown/index.ts
init_base_plugin();
var _HSDropdown = class _HSDropdown extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "toggle");
    __publicField(this, "closers");
    __publicField(this, "menu");
    __publicField(this, "eventMode");
    __publicField(this, "closeMode");
    __publicField(this, "hasAutofocus");
    __publicField(this, "animationInProcess");
    __publicField(this, "onElementMouseEnterListener");
    __publicField(this, "onElementMouseLeaveListener");
    __publicField(this, "onToggleClickListener");
    __publicField(this, "onToggleContextMenuListener");
    __publicField(this, "onCloserClickListener");
    this.toggle = this.el.querySelector(":scope > .hs-dropdown-toggle") || this.el.querySelector(
      ":scope > .hs-dropdown-toggle-wrapper > .hs-dropdown-toggle"
    ) || this.el.children[0];
    this.closers = Array.from(this.el.querySelectorAll(":scope .hs-dropdown-close")) || null;
    this.menu = this.el.querySelector(":scope > .hs-dropdown-menu");
    this.eventMode = getClassProperty(this.el, "--trigger", "click");
    this.closeMode = getClassProperty(this.el, "--auto-close", "true");
    this.hasAutofocus = stringToBoolean(
      getClassProperty(this.el, "--has-autofocus", "true") || "true"
    );
    this.animationInProcess = false;
    this.onCloserClickListener = [];
    if (this.toggle && this.menu) this.init();
  }
  elementMouseEnter() {
    this.onMouseEnterHandler();
  }
  elementMouseLeave() {
    this.onMouseLeaveHandler();
  }
  toggleClick(evt) {
    this.onClickHandler(evt);
  }
  toggleContextMenu(evt) {
    evt.preventDefault();
    this.onContextMenuHandler(evt);
  }
  closerClick() {
    this.close();
  }
  init() {
    this.createCollection(window.$hsDropdownCollection, this);
    if (this.toggle.disabled) return false;
    if (this.toggle) this.buildToggle();
    if (this.menu) this.buildMenu();
    if (this.closers) this.buildClosers();
    if (!isIOS() && !isIpadOS()) {
      this.onElementMouseEnterListener = () => this.elementMouseEnter();
      this.onElementMouseLeaveListener = () => this.elementMouseLeave();
      this.el.addEventListener("mouseenter", this.onElementMouseEnterListener);
      this.el.addEventListener("mouseleave", this.onElementMouseLeaveListener);
    }
  }
  resizeHandler() {
    this.eventMode = getClassProperty(this.el, "--trigger", "click");
    this.closeMode = getClassProperty(this.el, "--auto-close", "true");
  }
  buildToggle() {
    var _a;
    if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) {
      if (this.el.classList.contains("open")) this.toggle.ariaExpanded = "true";
      else this.toggle.ariaExpanded = "false";
    }
    if (this.eventMode === "contextmenu") {
      this.onToggleContextMenuListener = (evt) => this.toggleContextMenu(evt);
      this.toggle.addEventListener(
        "contextmenu",
        this.onToggleContextMenuListener
      );
    } else {
      this.onToggleClickListener = (evt) => this.toggleClick(evt);
      this.toggle.addEventListener("click", this.onToggleClickListener);
    }
  }
  buildMenu() {
    this.menu.role = this.menu.getAttribute("role") || "menu";
    const checkboxes = this.menu.querySelectorAll('[role="menuitemcheckbox"]');
    const radiobuttons = this.menu.querySelectorAll('[role="menuitemradio"]');
    checkboxes.forEach((el) => el.addEventListener("click", () => this.selectCheckbox(el)));
    radiobuttons.forEach((el) => el.addEventListener("click", () => this.selectRadio(el)));
  }
  buildClosers() {
    this.closers.forEach((el) => {
      this.onCloserClickListener.push({
        el,
        fn: () => this.closerClick()
      });
      el.addEventListener(
        "click",
        this.onCloserClickListener.find((closer) => closer.el === el).fn
      );
    });
  }
  getScrollbarSize() {
    let div = document.createElement("div");
    div.style.overflow = "scroll";
    div.style.width = "100px";
    div.style.height = "100px";
    document.body.appendChild(div);
    let scrollbarSize = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarSize;
  }
  onContextMenuHandler(evt) {
    const virtualElement = {
      getBoundingClientRect: () => new DOMRect()
    };
    virtualElement.getBoundingClientRect = () => new DOMRect(evt.clientX, evt.clientY, 0, 0);
    _HSDropdown.closeCurrentlyOpened();
    if (this.el.classList.contains("open") && !this.menu.classList.contains("hidden")) {
      this.close();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${this.getScrollbarSize()}px`;
      this.open(virtualElement);
    }
  }
  onClickHandler(evt) {
    if (this.el.classList.contains("open") && !this.menu.classList.contains("hidden")) {
      this.close();
    } else {
      this.open();
    }
  }
  onMouseEnterHandler() {
    if (this.eventMode !== "hover") return false;
    if (this.el._popper) this.forceClearState();
    if (!this.el.classList.contains("open") && this.menu.classList.contains("hidden")) {
      this.open();
    }
  }
  onMouseLeaveHandler() {
    if (this.eventMode !== "hover") return false;
    if (this.el.classList.contains("open") && !this.menu.classList.contains("hidden")) {
      this.close();
    }
  }
  destroyPopper() {
    const scope = (window.getComputedStyle(this.el).getPropertyValue("--scope") || "").replace(" ", "");
    this.menu.classList.remove("block");
    this.menu.classList.add("hidden");
    this.menu.style.inset = null;
    this.menu.style.position = null;
    if (this.el && this.el._popper) this.el._popper.destroy();
    if (scope === "window") this.el.appendChild(this.menu);
    this.animationInProcess = false;
  }
  absoluteStrategyModifiers() {
    return [
      {
        name: "applyStyles",
        fn: (data) => {
          const strategy = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "absolute").replace(" ", "");
          const adaptive = (window.getComputedStyle(this.el).getPropertyValue("--adaptive") || "adaptive").replace(" ", "");
          data.state.elements.popper.style.position = strategy;
          data.state.elements.popper.style.transform = adaptive === "adaptive" ? data.state.styles.popper.transform : null;
          data.state.elements.popper.style.top = null;
          data.state.elements.popper.style.bottom = null;
          data.state.elements.popper.style.left = null;
          data.state.elements.popper.style.right = null;
          data.state.elements.popper.style.margin = 0;
        }
      }
    ];
  }
  focusElement() {
    const input = this.menu.querySelector("[autofocus]");
    if (!input) return false;
    else input.focus();
  }
  setupPopper(target) {
    const _target = target || this.el;
    const placement = (window.getComputedStyle(this.el).getPropertyValue("--placement") || "").replace(" ", "");
    const flip2 = (window.getComputedStyle(this.el).getPropertyValue("--flip") || "true").replace(" ", "");
    const strategy = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "fixed").replace(" ", "");
    const offset2 = parseInt(
      (window.getComputedStyle(this.el).getPropertyValue("--offset") || "10").replace(" ", "")
    );
    const gpuAcceleration = (window.getComputedStyle(this.el).getPropertyValue("--gpu-acceleration") || "true").replace(" ", "");
    const popperInstance = createPopper3(_target, this.menu, {
      placement: POSITIONS[placement] || "bottom-start",
      strategy,
      modifiers: [
        ...strategy !== "fixed" ? this.absoluteStrategyModifiers() : [],
        {
          name: "flip",
          enabled: flip2 === "true"
        },
        {
          name: "offset",
          options: {
            offset: [0, offset2]
          }
        },
        {
          name: "computeStyles",
          options: {
            adaptive: strategy !== "fixed" ? false : true,
            gpuAcceleration: gpuAcceleration === "true"
          }
        }
      ]
    });
    return popperInstance;
  }
  selectCheckbox(target) {
    target.ariaChecked = target.ariaChecked === "true" ? "false" : "true";
  }
  selectRadio(target) {
    if (target.ariaChecked === "true") return false;
    const group = target.closest(".group");
    const items = group.querySelectorAll('[role="menuitemradio"]');
    const otherItems = Array.from(items).filter((el) => el !== target);
    otherItems.forEach((el) => {
      el.ariaChecked = "false";
    });
    target.ariaChecked = "true";
  }
  // Public methods
  calculatePopperPosition(target) {
    const popperInstance = this.setupPopper(target);
    popperInstance.forceUpdate();
    const popperPosition = popperInstance.state.placement;
    popperInstance.destroy();
    return popperPosition;
  }
  open(target) {
    if (this.el.classList.contains("open") || this.animationInProcess) return false;
    const _target = target || this.el;
    this.animationInProcess = true;
    const scope = (window.getComputedStyle(this.el).getPropertyValue("--scope") || "").replace(" ", "");
    const placement = (window.getComputedStyle(this.el).getPropertyValue("--placement") || "").replace(" ", "");
    const flip2 = (window.getComputedStyle(this.el).getPropertyValue("--flip") || "true").replace(" ", "");
    const strategy = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "fixed").replace(" ", "");
    const offset2 = parseInt(
      (window.getComputedStyle(this.el).getPropertyValue("--offset") || "10").replace(" ", "")
    );
    const gpuAcceleration = (window.getComputedStyle(this.el).getPropertyValue("--gpu-acceleration") || "true").replace(" ", "");
    if (scope === "window") document.body.appendChild(this.menu);
    if (strategy !== "static") {
      this.el._popper = createPopper3(_target, this.menu, {
        placement: POSITIONS[placement] || "bottom-start",
        strategy,
        modifiers: [
          ...strategy !== "fixed" ? this.absoluteStrategyModifiers() : [],
          {
            name: "flip",
            enabled: flip2 === "true"
          },
          {
            name: "offset",
            options: {
              offset: [0, offset2]
            }
          },
          {
            name: "computeStyles",
            options: {
              adaptive: strategy !== "fixed" ? false : true,
              gpuAcceleration: gpuAcceleration === "true" ? true : false
            }
          }
        ]
      });
    }
    this.menu.style.margin = null;
    this.menu.classList.remove("hidden");
    this.menu.classList.add("block");
    setTimeout(() => {
      var _a;
      if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "true";
      this.el.classList.add("open");
      if (scope === "window") this.menu.classList.add("open");
      this.animationInProcess = false;
      if (this.hasAutofocus) this.focusElement();
      this.fireEvent("open", this.el);
      dispatch("open.hs.dropdown", this.el, this.el);
    });
  }
  close(isAnimated = true) {
    if (this.animationInProcess || !this.el.classList.contains("open"))
      return false;
    const scope = (window.getComputedStyle(this.el).getPropertyValue("--scope") || "").replace(" ", "");
    const clearAfterClose = () => {
      var _a;
      this.menu.style.margin = null;
      if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "false";
      this.el.classList.remove("open");
      this.fireEvent("close", this.el);
      dispatch("close.hs.dropdown", this.el, this.el);
    };
    this.animationInProcess = true;
    if (scope === "window") this.menu.classList.remove("open");
    if (isAnimated) {
      const el = this.el.querySelector("[data-hs-dropdown-transition]") || this.menu;
      afterTransition(el, () => this.destroyPopper());
    } else this.destroyPopper();
    clearAfterClose();
  }
  forceClearState() {
    this.destroyPopper();
    this.menu.style.margin = null;
    this.el.classList.remove("open");
  }
  destroy() {
    if (!isIOS() && !isIpadOS()) {
      this.el.removeEventListener(
        "mouseenter",
        this.onElementMouseEnterListener
      );
      this.el.removeEventListener(
        "mouseleave",
        () => this.onElementMouseLeaveListener
      );
      this.onElementMouseEnterListener = null;
      this.onElementMouseLeaveListener = null;
    }
    this.toggle.removeEventListener("click", this.onToggleClickListener);
    this.onToggleClickListener = null;
    if (this.closers.length) {
      this.closers.forEach((el) => {
        el.removeEventListener(
          "click",
          this.onCloserClickListener.find((closer) => closer.el === el).fn
        );
      });
      this.onCloserClickListener = null;
    }
    this.el.classList.remove("open");
    this.destroyPopper();
    window.$hsDropdownCollection = window.$hsDropdownCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsDropdownCollection.find((el) => {
      if (target instanceof _HSDropdown) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsDropdownCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsDropdownCollection) {
      window.$hsDropdownCollection = [];
      document.addEventListener(
        "keydown",
        (evt) => _HSDropdown.accessibility(evt)
      );
      window.addEventListener("click", (evt) => {
        const evtTarget = evt.target;
        _HSDropdown.closeCurrentlyOpened(evtTarget);
      });
      let prevWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        if (window.innerWidth !== prevWidth) {
          prevWidth = innerWidth;
          _HSDropdown.closeCurrentlyOpened(null, false);
        }
      });
    }
    if (window.$hsDropdownCollection)
      window.$hsDropdownCollection = window.$hsDropdownCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(".hs-dropdown:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsDropdownCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSDropdown(el);
    });
  }
  static open(target) {
    const instance = _HSDropdown.findInCollection(target);
    if (instance && instance.element.menu.classList.contains("hidden")) instance.element.open();
  }
  static close(target) {
    const instance = _HSDropdown.findInCollection(target);
    if (instance && !instance.element.menu.classList.contains("hidden")) instance.element.close();
  }
  // Accessibility methods
  static accessibility(evt) {
    this.history = menuSearchHistory;
    const target = window.$hsDropdownCollection.find(
      (el) => el.element.el.classList.contains("open")
    );
    if (target && (DROPDOWN_ACCESSIBILITY_KEY_SET.includes(evt.code) || evt.code.length === 4 && evt.code[evt.code.length - 1].match(/^[A-Z]*$/)) && !evt.metaKey && !target.element.menu.querySelector("input:focus") && !target.element.menu.querySelector("textarea:focus")) {
      switch (evt.code) {
        case "Escape":
          if (!target.element.menu.querySelector(".hs-select.active")) {
            evt.preventDefault();
            this.onEscape(evt);
          }
          break;
        case "Enter":
          if (!target.element.menu.querySelector(".hs-select button:focus") && !target.element.menu.querySelector(".hs-collapse-toggle:focus")) {
            this.onEnter(evt);
          }
          break;
        case "ArrowUp":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow();
          break;
        case "ArrowDown":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow(false);
          break;
        case "ArrowRight":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrowX(evt, "right");
          break;
        case "ArrowLeft":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrowX(evt, "left");
          break;
        case "Home":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd();
          break;
        case "End":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd(false);
          break;
        default:
          evt.preventDefault();
          this.onFirstLetter(evt.key);
          break;
      }
    }
  }
  static onEscape(evt) {
    const dropdown = evt.target.closest(".hs-dropdown.open");
    if (window.$hsDropdownCollection.find((el) => el.element.el === dropdown)) {
      const target = window.$hsDropdownCollection.find(
        (el) => el.element.el === dropdown
      );
      if (target) {
        target.element.close();
        target.element.toggle.focus();
      }
    } else {
      this.closeCurrentlyOpened();
    }
  }
  static onEnter(evt) {
    const target = evt.target;
    const { element } = window.$hsDropdownCollection.find(
      (el) => el.element.el === target.closest(".hs-dropdown")
    ) ?? null;
    if (element && target.classList.contains("hs-dropdown-toggle")) {
      evt.preventDefault();
      element.open();
    } else if (element && target.getAttribute("role") === "menuitemcheckbox") {
      element.selectCheckbox(target);
      element.close();
    } else if (element && target.getAttribute("role") === "menuitemradio") {
      element.selectRadio(target);
      element.close();
    } else {
      return false;
    }
  }
  static onArrow(isArrowUp = true) {
    const target = window.$hsDropdownCollection.find(
      (el) => el.element.el.classList.contains("open")
    );
    if (target) {
      const menu = target.element.menu;
      if (!menu) return false;
      const preparedLinks = isArrowUp ? Array.from(
        menu.querySelectorAll(
          'a:not([hidden]), .hs-dropdown > button:not([hidden]), [role="button"]:not([hidden]), [role^="menuitem"]:not([hidden])'
        )
      ).reverse() : Array.from(
        menu.querySelectorAll(
          'a:not([hidden]), .hs-dropdown > button:not([hidden]), [role="button"]:not([hidden]), [role^="menuitem"]:not([hidden])'
        )
      );
      const visiblePreparedLinks = Array.from(preparedLinks).filter((item) => {
        const el = item;
        return el.closest("[hidden]") === null && el.offsetParent !== null;
      });
      const links = visiblePreparedLinks.filter(
        (el) => !el.classList.contains("disabled")
      );
      const current = menu.querySelector(
        'a:focus, button:focus, [role="button"]:focus, [role^="menuitem"]:focus'
      );
      let currentInd = links.findIndex((el) => el === current);
      if (currentInd + 1 < links.length) {
        currentInd++;
      }
      links[currentInd].focus();
    }
  }
  static onArrowX(evt, direction) {
    const toggle = evt.target;
    const closestDropdown = toggle.closest(".hs-dropdown.open");
    const isRootDropdown = !!closestDropdown && !(closestDropdown == null ? void 0 : closestDropdown.parentElement.closest(".hs-dropdown"));
    const menuToOpen = _HSDropdown.getInstance(
      toggle.closest(".hs-dropdown"),
      true
    ) ?? null;
    const firstLink = menuToOpen.element.menu.querySelector(
      'a, button, [role="button"], [role^="menuitem"]'
    );
    if (isRootDropdown && !toggle.classList.contains("hs-dropdown-toggle"))
      return false;
    const menuToClose = _HSDropdown.getInstance(
      toggle.closest(".hs-dropdown.open"),
      true
    ) ?? null;
    if (menuToOpen.element.el.classList.contains("open") && menuToOpen.element.el._popper.state.placement.includes(direction)) {
      firstLink.focus();
      return false;
    }
    console.log(menuToOpen);
    const futurePosition = menuToOpen.element.calculatePopperPosition();
    if (isRootDropdown && !futurePosition.includes(direction)) return false;
    if (futurePosition.includes(direction) && toggle.classList.contains("hs-dropdown-toggle")) {
      menuToOpen.element.open();
      firstLink.focus();
    } else {
      menuToClose.element.close(false);
      menuToClose.element.toggle.focus();
    }
  }
  static onStartEnd(isStart = true) {
    const target = window.$hsDropdownCollection.find(
      (el) => el.element.el.classList.contains("open")
    );
    if (target) {
      const menu = target.element.menu;
      if (!menu) return false;
      const preparedLinks = isStart ? Array.from(
        menu.querySelectorAll(
          'a, button, [role="button"], [role^="menuitem"]'
        )
      ) : Array.from(
        menu.querySelectorAll(
          'a, button, [role="button"], [role^="menuitem"]'
        )
      ).reverse();
      const links = preparedLinks.filter(
        (el) => !el.classList.contains("disabled")
      );
      if (links.length) {
        links[0].focus();
      }
    }
  }
  static onFirstLetter(code) {
    const target = window.$hsDropdownCollection.find(
      (el) => el.element.el.classList.contains("open")
    );
    if (target) {
      const menu = target.element.menu;
      if (!menu) return false;
      const links = Array.from(
        menu.querySelectorAll('a, [role="button"], [role^="menuitem"]')
      );
      const getCurrentInd = () => links.findIndex(
        (el, i) => el.innerText.toLowerCase().charAt(0) === code.toLowerCase() && this.history.existsInHistory(i)
      );
      let currentInd = getCurrentInd();
      if (currentInd === -1) {
        this.history.clearHistory();
        currentInd = getCurrentInd();
      }
      if (currentInd !== -1) {
        links[currentInd].focus();
        this.history.addHistory(currentInd);
      }
    }
  }
  static closeCurrentlyOpened(evtTarget = null, isAnimated = true) {
    const parent = evtTarget && evtTarget.closest(".hs-dropdown") && evtTarget.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") ? evtTarget.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") : null;
    let currentlyOpened = parent ? window.$hsDropdownCollection.filter(
      (el) => el.element.el.classList.contains("open") && el.element.menu.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") === parent
    ) : window.$hsDropdownCollection.filter(
      (el) => el.element.el.classList.contains("open")
    );
    if (evtTarget && evtTarget.closest(".hs-dropdown") && getClassPropertyAlt(evtTarget.closest(".hs-dropdown"), "--auto-close") === "inside") {
      currentlyOpened = currentlyOpened.filter(
        (el) => el.element.el !== evtTarget.closest(".hs-dropdown")
      );
    }
    if (currentlyOpened) {
      currentlyOpened.forEach((el) => {
        if (el.element.closeMode === "false" || el.element.closeMode === "outside")
          return false;
        el.element.close(isAnimated);
      });
    }
    if (currentlyOpened) {
      currentlyOpened.forEach((el) => {
        if (getClassPropertyAlt(el.element.el, "--trigger") !== "contextmenu")
          return false;
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      });
    }
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSDropdown.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
__publicField(_HSDropdown, "history");
var HSDropdown = _HSDropdown;
window.addEventListener("load", () => {
  HSDropdown.autoInit();
});
window.addEventListener("resize", () => {
  if (!window.$hsDropdownCollection) window.$hsDropdownCollection = [];
  window.$hsDropdownCollection.forEach((el) => el.element.resizeHandler());
});
if (typeof window !== "undefined") {
  window.HSDropdown = HSDropdown;
}
var dropdown_default = HSDropdown;

// node_modules/preline/src/plugins/input-number/index.ts
init_utils();
init_base_plugin();
var HSInputNumber = class _HSInputNumber extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "input");
    __publicField(this, "increment");
    __publicField(this, "decrement");
    __publicField(this, "inputValue");
    __publicField(this, "minInputValue");
    __publicField(this, "maxInputValue");
    __publicField(this, "step");
    __publicField(this, "onInputInputListener");
    __publicField(this, "onIncrementClickListener");
    __publicField(this, "onDecrementClickListener");
    this.input = this.el.querySelector("[data-hs-input-number-input]") || null;
    this.increment = this.el.querySelector("[data-hs-input-number-increment]") || null;
    this.decrement = this.el.querySelector("[data-hs-input-number-decrement]") || null;
    if (this.input) this.checkIsNumberAndConvert();
    const data = this.el.dataset.hsInputNumber;
    const dataOptions = data ? JSON.parse(data) : { step: 1 };
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.minInputValue = "min" in concatOptions ? concatOptions.min : 0;
    this.maxInputValue = "max" in concatOptions ? concatOptions.max : null;
    this.step = "step" in concatOptions && concatOptions.step > 0 ? concatOptions.step : 1;
    this.init();
  }
  inputInput() {
    this.changeValue();
  }
  incrementClick() {
    this.changeValue("increment");
  }
  decrementClick() {
    this.changeValue("decrement");
  }
  init() {
    this.createCollection(window.$hsInputNumberCollection, this);
    if (this.input && this.increment) this.build();
  }
  checkIsNumberAndConvert() {
    const value = this.input.value.trim();
    const cleanedValue = this.cleanAndExtractNumber(value);
    if (cleanedValue !== null) {
      this.inputValue = cleanedValue;
      this.input.value = cleanedValue.toString();
    } else {
      this.inputValue = 0;
      this.input.value = "0";
    }
  }
  cleanAndExtractNumber(value) {
    const cleanedArray = [];
    let decimalFound = false;
    value.split("").forEach((char) => {
      if (char >= "0" && char <= "9") cleanedArray.push(char);
      else if (char === "." && !decimalFound) {
        cleanedArray.push(char);
        decimalFound = true;
      }
    });
    const cleanedValue = cleanedArray.join("");
    const number = parseFloat(cleanedValue);
    return isNaN(number) ? null : number;
  }
  build() {
    if (this.input) this.buildInput();
    if (this.increment) this.buildIncrement();
    if (this.decrement) this.buildDecrement();
    if (this.inputValue <= this.minInputValue) {
      this.inputValue = this.minInputValue;
      this.input.value = `${this.minInputValue}`;
    }
    if (this.inputValue <= this.minInputValue) this.changeValue();
    if (this.input.hasAttribute("disabled")) this.disableButtons();
  }
  buildInput() {
    this.onInputInputListener = () => this.inputInput();
    this.input.addEventListener("input", this.onInputInputListener);
  }
  buildIncrement() {
    this.onIncrementClickListener = () => this.incrementClick();
    this.increment.addEventListener("click", this.onIncrementClickListener);
  }
  buildDecrement() {
    this.onDecrementClickListener = () => this.decrementClick();
    this.decrement.addEventListener("click", this.onDecrementClickListener);
  }
  changeValue(event = "none") {
    const payload = { inputValue: this.inputValue };
    const minInputValue = this.minInputValue ?? Number.MIN_SAFE_INTEGER;
    const maxInputValue = this.maxInputValue ?? Number.MAX_SAFE_INTEGER;
    this.inputValue = isNaN(this.inputValue) ? 0 : this.inputValue;
    switch (event) {
      case "increment":
        const incrementedResult = this.inputValue + this.step;
        this.inputValue = incrementedResult >= minInputValue && incrementedResult <= maxInputValue ? incrementedResult : maxInputValue;
        this.input.value = this.inputValue.toString();
        break;
      case "decrement":
        const decrementedResult = this.inputValue - this.step;
        this.inputValue = decrementedResult >= minInputValue && decrementedResult <= maxInputValue ? decrementedResult : minInputValue;
        this.input.value = this.inputValue.toString();
        break;
      default:
        const defaultResult = isNaN(parseInt(this.input.value)) ? 0 : parseInt(this.input.value);
        this.inputValue = defaultResult >= maxInputValue ? maxInputValue : defaultResult <= minInputValue ? minInputValue : defaultResult;
        if (this.inputValue <= minInputValue)
          this.input.value = this.inputValue.toString();
        break;
    }
    payload.inputValue = this.inputValue;
    if (this.inputValue === minInputValue) {
      this.el.classList.add("disabled");
      if (this.decrement) this.disableButtons("decrement");
    } else {
      this.el.classList.remove("disabled");
      if (this.decrement) this.enableButtons("decrement");
    }
    if (this.inputValue === maxInputValue) {
      this.el.classList.add("disabled");
      if (this.increment) this.disableButtons("increment");
    } else {
      this.el.classList.remove("disabled");
      if (this.increment) this.enableButtons("increment");
    }
    this.fireEvent("change", payload);
    dispatch("change.hs.inputNumber", this.el, payload);
  }
  disableButtons(mode = "all") {
    if (mode === "all") {
      if (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT")
        this.increment.setAttribute("disabled", "disabled");
      if (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT")
        this.decrement.setAttribute("disabled", "disabled");
    } else if (mode === "increment") {
      if (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT")
        this.increment.setAttribute("disabled", "disabled");
    } else if (mode === "decrement") {
      if (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT")
        this.decrement.setAttribute("disabled", "disabled");
    }
  }
  enableButtons(mode = "all") {
    if (mode === "all") {
      if (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT")
        this.increment.removeAttribute("disabled");
      if (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT")
        this.decrement.removeAttribute("disabled");
    } else if (mode === "increment") {
      if (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT")
        this.increment.removeAttribute("disabled");
    } else if (mode === "decrement") {
      if (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT")
        this.decrement.removeAttribute("disabled");
    }
  }
  // Public methods
  destroy() {
    this.el.classList.remove("disabled");
    this.increment.removeAttribute("disabled");
    this.decrement.removeAttribute("disabled");
    this.input.removeEventListener("input", this.onInputInputListener);
    this.increment.removeEventListener("click", this.onIncrementClickListener);
    this.decrement.removeEventListener("click", this.onDecrementClickListener);
    window.$hsInputNumberCollection = window.$hsInputNumberCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Global method
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsInputNumberCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsInputNumberCollection) window.$hsInputNumberCollection = [];
    if (window.$hsInputNumberCollection)
      window.$hsInputNumberCollection = window.$hsInputNumberCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-input-number]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsInputNumberCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSInputNumber(el);
    });
  }
};
window.addEventListener("load", () => {
  HSInputNumber.autoInit();
});
if (typeof window !== "undefined") {
  window.HSInputNumber = HSInputNumber;
}
var input_number_default = HSInputNumber;

// node_modules/preline/src/plugins/layout-splitter/index.ts
init_utils();
init_base_plugin();
var _HSLayoutSplitter = class _HSLayoutSplitter extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "horizontalSplitterClasses");
    __publicField(this, "horizontalSplitterTemplate");
    __publicField(this, "verticalSplitterClasses");
    __publicField(this, "verticalSplitterTemplate");
    __publicField(this, "isSplittersAddedManually");
    __publicField(this, "horizontalSplitters");
    __publicField(this, "horizontalControls");
    __publicField(this, "verticalSplitters");
    __publicField(this, "verticalControls");
    __publicField(this, "isDragging");
    __publicField(this, "activeSplitter");
    __publicField(this, "onControlPointerDownListener");
    const data = el.getAttribute("data-hs-layout-splitter");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.horizontalSplitterClasses = (concatOptions == null ? void 0 : concatOptions.horizontalSplitterClasses) || null;
    this.horizontalSplitterTemplate = (concatOptions == null ? void 0 : concatOptions.horizontalSplitterTemplate) || "<div></div>";
    this.verticalSplitterClasses = (concatOptions == null ? void 0 : concatOptions.verticalSplitterClasses) || null;
    this.verticalSplitterTemplate = (concatOptions == null ? void 0 : concatOptions.verticalSplitterTemplate) || "<div></div>";
    this.isSplittersAddedManually = (concatOptions == null ? void 0 : concatOptions.isSplittersAddedManually) ?? false;
    this.horizontalSplitters = [];
    this.horizontalControls = [];
    this.verticalSplitters = [];
    this.verticalControls = [];
    this.isDragging = false;
    this.activeSplitter = null;
    this.onControlPointerDownListener = [];
    this.init();
  }
  controlPointerDown(item) {
    this.isDragging = true;
    this.activeSplitter = item;
    this.onPointerDownHandler(item);
  }
  controlPointerUp() {
    this.isDragging = false;
    this.activeSplitter = null;
    this.onPointerUpHandler();
  }
  init() {
    this.createCollection(window.$hsLayoutSplitterCollection, this);
    this.buildSplitters();
    if (!_HSLayoutSplitter.isListenersInitialized) {
      document.addEventListener(
        "pointermove",
        _HSLayoutSplitter.onDocumentPointerMove
      );
      document.addEventListener(
        "pointerup",
        _HSLayoutSplitter.onDocumentPointerUp
      );
      _HSLayoutSplitter.isListenersInitialized = true;
    }
  }
  buildSplitters() {
    this.buildHorizontalSplitters();
    this.buildVerticalSplitters();
  }
  buildHorizontalSplitters() {
    const groups = this.el.querySelectorAll(
      "[data-hs-layout-splitter-horizontal-group]"
    );
    if (groups.length) {
      groups.forEach((el) => {
        this.horizontalSplitters.push({
          el,
          items: Array.from(
            el.querySelectorAll(":scope > [data-hs-layout-splitter-item]")
          )
        });
      });
      this.updateHorizontalSplitter();
    }
  }
  buildVerticalSplitters() {
    const groups = this.el.querySelectorAll(
      "[data-hs-layout-splitter-vertical-group]"
    );
    if (groups.length) {
      groups.forEach((el) => {
        this.verticalSplitters.push({
          el,
          items: Array.from(
            el.querySelectorAll(":scope > [data-hs-layout-splitter-item]")
          )
        });
      });
      this.updateVerticalSplitter();
    }
  }
  buildControl(prev, next, direction = "horizontal") {
    let el;
    if (this.isSplittersAddedManually) {
      el = next == null ? void 0 : next.previousElementSibling;
      if (!el) return false;
      el.style.display = "";
    } else {
      el = htmlToElement(direction === "horizontal" ? this.horizontalSplitterTemplate : this.verticalSplitterTemplate);
      classToClassList(direction === "horizontal" ? this.horizontalSplitterClasses : this.verticalSplitterClasses, el);
      el.classList.add("hs-layout-splitter-control");
    }
    const item = { el, direction, prev, next };
    if (direction === "horizontal") this.horizontalControls.push(item);
    else this.verticalControls.push(item);
    this.bindListeners(item);
    if (next && !this.isSplittersAddedManually) prev.insertAdjacentElement("afterend", el);
  }
  getSplitterItemParsedParam(item) {
    const param = item.getAttribute("data-hs-layout-splitter-item");
    return isJson(param) ? JSON.parse(param) : param;
  }
  getContainerSize(container, isHorizontal) {
    return isHorizontal ? container.getBoundingClientRect().width : container.getBoundingClientRect().height;
  }
  getMaxFlexSize(element, param, totalWidth) {
    const paramValue = this.getSplitterItemSingleParam(element, param);
    return typeof paramValue === "number" ? paramValue / 100 * totalWidth : 0;
  }
  updateHorizontalSplitter() {
    this.horizontalSplitters.forEach(({ items }) => {
      items.forEach((el) => {
        this.updateSingleSplitter(el);
      });
      items.forEach((el, index) => {
        if (index >= items.length - 1) this.buildControl(el, null);
        else this.buildControl(el, items[index + 1]);
      });
    });
  }
  updateSingleSplitter(el) {
    const param = el.getAttribute("data-hs-layout-splitter-item");
    const parsedParam = isJson(param) ? JSON.parse(param) : param;
    const width = isJson(param) ? parsedParam.dynamicSize : param;
    el.style.flex = `${width} 1 0`;
  }
  updateVerticalSplitter() {
    this.verticalSplitters.forEach(({ items }) => {
      items.forEach((el) => {
        this.updateSingleSplitter(el);
      });
      items.forEach((el, index) => {
        if (index >= items.length - 1) this.buildControl(el, null, "vertical");
        else this.buildControl(el, items[index + 1], "vertical");
      });
    });
  }
  updateSplitterItemParam(item, newSize) {
    const param = this.getSplitterItemParsedParam(item);
    const newSizeFixed = newSize.toFixed(1);
    const newParam = typeof param === "object" ? JSON.stringify({
      ...param,
      dynamicSize: +newSizeFixed
    }) : newSizeFixed;
    item.setAttribute(
      "data-hs-layout-splitter-item",
      newParam
    );
  }
  onPointerDownHandler(item) {
    const { el, prev, next } = item;
    el.classList.add("dragging");
    prev.classList.add("dragging");
    next.classList.add("dragging");
    document.body.style.userSelect = "none";
  }
  onPointerUpHandler() {
    document.body.style.userSelect = "";
  }
  onPointerMoveHandler(evt, item, direction) {
    const { prev, next } = item;
    const container = item.el.closest(
      direction === "horizontal" ? "[data-hs-layout-splitter-horizontal-group]" : "[data-hs-layout-splitter-vertical-group]"
    );
    const isHorizontal = direction === "horizontal";
    const totalSize = this.getContainerSize(container, isHorizontal);
    const availableSize = this.calculateAvailableSize(container, prev, next, isHorizontal, totalSize);
    const sizes = this.calculateResizedSizes(evt, prev, availableSize, isHorizontal);
    const adjustedSizes = this.enforceLimits(sizes, prev, next, totalSize, availableSize);
    this.applySizes(prev, next, adjustedSizes, totalSize);
  }
  bindListeners(item) {
    const { el } = item;
    this.onControlPointerDownListener.push({
      el,
      fn: () => this.controlPointerDown(item)
    });
    el.addEventListener(
      "pointerdown",
      this.onControlPointerDownListener.find((control) => control.el === el).fn
    );
  }
  calculateAvailableSize(container, prev, next, isHorizontal, totalSize) {
    const items = container.querySelectorAll(":scope > [data-hs-layout-splitter-item]");
    const otherSize = Array.from(items).reduce((sum, item) => {
      if (item === prev || item === next) return sum;
      const rect = item.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(item);
      return sum + (computedStyle.position === "fixed" ? 0 : isHorizontal ? rect.width : rect.height);
    }, 0);
    return totalSize - otherSize;
  }
  calculateResizedSizes(evt, prev, availableSize, isHorizontal) {
    const prevStart = isHorizontal ? prev.getBoundingClientRect().left : prev.getBoundingClientRect().top;
    let previousSize = Math.max(0, Math.min((isHorizontal ? evt.clientX : evt.clientY) - prevStart, availableSize));
    let nextSize = availableSize - previousSize;
    return { previousSize, nextSize };
  }
  enforceLimits(sizes, prev, next, totalSize, availableSize) {
    const prevMinSize = this.getMaxFlexSize(prev, "minSize", totalSize);
    const nextMinSize = this.getMaxFlexSize(next, "minSize", totalSize);
    const prevPreLimitSize = this.getMaxFlexSize(prev, "preLimitSize", totalSize);
    const nextPreLimitSize = this.getMaxFlexSize(next, "preLimitSize", totalSize);
    let { previousSize, nextSize } = sizes;
    if (nextSize < nextMinSize) {
      nextSize = nextMinSize;
      previousSize = availableSize - nextSize;
    } else if (previousSize < prevMinSize) {
      previousSize = prevMinSize;
      nextSize = availableSize - previousSize;
    }
    const payload = {
      prev,
      next,
      previousSize: previousSize.toFixed(),
      previousFlexSize: previousSize / totalSize * 100,
      previousPreLimitSize: prevPreLimitSize,
      previousPreLimitFlexSize: prevPreLimitSize / totalSize * 100,
      previousMinSize: prevMinSize,
      previousMinFlexSize: prevMinSize / totalSize * 100,
      nextSize: nextSize.toFixed(),
      nextFlexSize: nextSize / totalSize * 100,
      nextPreLimitSize,
      nextPreLimitFlexSize: nextPreLimitSize / totalSize * 100,
      nextMinSize,
      nextMinFlexSize: nextMinSize / totalSize * 100,
      static: {
        prev: {
          minSize: this.getSplitterItemSingleParam(prev, "minSize"),
          preLimitSize: this.getSplitterItemSingleParam(prev, "preLimitSize")
        },
        next: {
          minSize: this.getSplitterItemSingleParam(next, "minSize"),
          preLimitSize: this.getSplitterItemSingleParam(next, "preLimitSize")
        }
      }
    };
    if (nextSize < nextMinSize) {
      this.fireEvent("onNextLimit", payload);
      dispatch("onNextLimit.hs.layoutSplitter", this.el, payload);
    } else if (previousSize < prevMinSize) {
      this.fireEvent("onPrevLimit", payload);
      dispatch("onPrevLimit.hs.layoutSplitter", this.el, payload);
    }
    if (previousSize <= prevPreLimitSize) {
      this.fireEvent("onPrevPreLimit", payload);
      dispatch("onPrevPreLimit.hs.layoutSplitter", this.el, payload);
    }
    if (nextSize <= nextPreLimitSize) {
      this.fireEvent("onNextPreLimit", payload);
      dispatch("onNextPreLimit.hs.layoutSplitter", this.el, payload);
    }
    this.fireEvent("drag", payload);
    dispatch("drag.hs.layoutSplitter", this.el, payload);
    return { previousSize, nextSize };
  }
  applySizes(prev, next, sizes, totalSize) {
    const { previousSize, nextSize } = sizes;
    const prevPercent = previousSize / totalSize * 100;
    this.updateSplitterItemParam(prev, prevPercent);
    prev.style.flex = `${prevPercent.toFixed(1)} 1 0`;
    const nextPercent = nextSize / totalSize * 100;
    this.updateSplitterItemParam(next, nextPercent);
    next.style.flex = `${nextPercent.toFixed(1)} 1 0`;
  }
  // Public methods
  getSplitterItemSingleParam(item, name) {
    try {
      const param = this.getSplitterItemParsedParam(item);
      return param[name];
    } catch {
      console.log("There is no parameter with this name in the object.");
      return false;
    }
  }
  getData(el) {
    const container = el.closest("[data-hs-layout-splitter-horizontal-group], [data-hs-layout-splitter-vertical-group]");
    if (!container) {
      throw new Error("Element is not inside a valid layout splitter container.");
    }
    const isHorizontal = container.matches("[data-hs-layout-splitter-horizontal-group]");
    const totalSize = this.getContainerSize(container, isHorizontal);
    const dynamicFlexSize = this.getSplitterItemSingleParam(el, "dynamicSize") || 0;
    const minSize = this.getMaxFlexSize(el, "minSize", totalSize);
    const preLimitSize = this.getMaxFlexSize(el, "preLimitSize", totalSize);
    const dynamicSize = dynamicFlexSize / 100 * totalSize;
    const minFlexSize = minSize / totalSize * 100;
    const preLimitFlexSize = preLimitSize / totalSize * 100;
    return {
      el,
      dynamicSize: +dynamicSize.toFixed(),
      dynamicFlexSize,
      minSize: +minSize.toFixed(),
      minFlexSize,
      preLimitSize: +preLimitSize.toFixed(),
      preLimitFlexSize,
      static: {
        minSize: this.getSplitterItemSingleParam(el, "minSize") ?? null,
        preLimitSize: this.getSplitterItemSingleParam(el, "preLimitSize") ?? null
      }
    };
  }
  setSplitterItemSize(el, size) {
    this.updateSplitterItemParam(el, size);
    el.style.flex = `${size.toFixed(1)} 1 0`;
  }
  updateFlexValues(data) {
    let totalFlex = 0;
    const currentWidth = window.innerWidth;
    const getBreakpointValue = (breakpoints) => {
      const sortedBreakpoints = Object.keys(breakpoints).map(Number).sort((a, b) => a - b);
      for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
        if (currentWidth >= sortedBreakpoints[i]) {
          return breakpoints[sortedBreakpoints[i]];
        }
      }
      return 0;
    };
    data.forEach(({ id, breakpoints }) => {
      const item = document.getElementById(id);
      if (item) {
        const flexValue = getBreakpointValue(breakpoints);
        this.updateSplitterItemParam(item, flexValue);
        item.style.flex = `${flexValue.toFixed(1)} 1 0`;
        totalFlex += flexValue;
      }
    });
    if (totalFlex !== 100) {
      const scaleFactor = 100 / totalFlex;
      data.forEach(({ id }) => {
        const item = document.getElementById(id);
        if (item) {
          const currentFlex = parseFloat(item.style.flex.split(" ")[0]);
          const adjustedFlex = currentFlex * scaleFactor;
          this.updateSplitterItemParam(item, adjustedFlex);
          item.style.flex = `${adjustedFlex.toFixed(1)} 1 0`;
        }
      });
    }
  }
  destroy() {
    if (this.onControlPointerDownListener) {
      this.onControlPointerDownListener.forEach(({ el, fn: fn2 }) => {
        el.removeEventListener("pointerdown", fn2);
      });
      this.onControlPointerDownListener = null;
    }
    this.horizontalSplitters.forEach(({ items }) => {
      items.forEach((el) => {
        el.style.flex = "";
      });
    });
    this.verticalSplitters.forEach(({ items }) => {
      items.forEach((el) => {
        el.style.flex = "";
      });
    });
    this.horizontalControls.forEach(({ el }) => {
      if (this.isSplittersAddedManually) el.style.display = "none";
      else el.remove();
    });
    this.verticalControls.forEach(({ el }) => {
      if (this.isSplittersAddedManually) el.style.display = "none";
      else el.remove();
    });
    this.horizontalControls = [];
    this.verticalControls = [];
    window.$hsLayoutSplitterCollection = window.$hsLayoutSplitterCollection.filter(
      ({ element }) => element.el !== this.el
    );
    if (window.$hsLayoutSplitterCollection.length === 0 && _HSLayoutSplitter.isListenersInitialized) {
      document.removeEventListener(
        "pointermove",
        _HSLayoutSplitter.onDocumentPointerMove
      );
      document.removeEventListener(
        "pointerup",
        _HSLayoutSplitter.onDocumentPointerUp
      );
      _HSLayoutSplitter.isListenersInitialized = false;
    }
  }
  // Static method
  static findInCollection(target) {
    return window.$hsLayoutSplitterCollection.find((el) => {
      if (target instanceof _HSLayoutSplitter) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static autoInit() {
    if (!window.$hsLayoutSplitterCollection) {
      window.$hsLayoutSplitterCollection = [];
      window.addEventListener("pointerup", () => {
        if (!window.$hsLayoutSplitterCollection) return false;
        const draggingElement = document.querySelector(
          ".hs-layout-splitter-control.dragging"
        );
        const draggingSections = document.querySelectorAll(
          "[data-hs-layout-splitter-item].dragging"
        );
        if (!draggingElement) return false;
        const draggingInstance = _HSLayoutSplitter.getInstance(
          draggingElement.closest("[data-hs-layout-splitter]"),
          true
        );
        draggingElement.classList.remove("dragging");
        draggingSections.forEach((el) => el.classList.remove("dragging"));
        draggingInstance.element.isDragging = false;
      });
    }
    if (window.$hsLayoutSplitterCollection)
      window.$hsLayoutSplitterCollection = window.$hsLayoutSplitterCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(
      "[data-hs-layout-splitter]:not(.--prevent-on-load-init)"
    ).forEach((el) => {
      if (!window.$hsLayoutSplitterCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSLayoutSplitter(el);
    });
  }
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsLayoutSplitterCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static on(evt, target, cb) {
    const instance = _HSLayoutSplitter.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
__publicField(_HSLayoutSplitter, "isListenersInitialized", false);
__publicField(_HSLayoutSplitter, "onDocumentPointerMove", (evt) => {
  const draggingElement = document.querySelector(
    ".hs-layout-splitter-control.dragging"
  );
  if (!draggingElement) return;
  const draggingInstance = _HSLayoutSplitter.getInstance(
    draggingElement.closest("[data-hs-layout-splitter]"),
    true
  );
  if (!draggingInstance || !draggingInstance.element.isDragging) return;
  const activeSplitter = draggingInstance.element.activeSplitter;
  if (!activeSplitter) return;
  if (activeSplitter.direction === "vertical")
    draggingInstance.element.onPointerMoveHandler(
      evt,
      activeSplitter,
      "vertical"
    );
  else
    draggingInstance.element.onPointerMoveHandler(
      evt,
      activeSplitter,
      "horizontal"
    );
});
__publicField(_HSLayoutSplitter, "onDocumentPointerUp", () => {
  const draggingElement = document.querySelector(
    ".hs-layout-splitter-control.dragging"
  );
  if (!draggingElement) return;
  const draggingInstance = _HSLayoutSplitter.getInstance(
    draggingElement.closest("[data-hs-layout-splitter]"),
    true
  );
  if (draggingInstance) draggingInstance.element.controlPointerUp();
});
var HSLayoutSplitter = _HSLayoutSplitter;
window.addEventListener("load", () => {
  HSLayoutSplitter.autoInit();
});
if (typeof window !== "undefined") {
  window.HSLayoutSplitter = HSLayoutSplitter;
}
var layout_splitter_default = HSLayoutSplitter;

// node_modules/preline/src/plugins/overlay/index.ts
init_utils();
init_base_plugin();
var HSOverlay = class _HSOverlay extends HSBasePlugin {
  constructor(el, options, events) {
    var _a, _b;
    super(el, options, events);
    __publicField(this, "hiddenClass");
    __publicField(this, "emulateScrollbarSpace");
    __publicField(this, "isClosePrev");
    __publicField(this, "backdropClasses");
    __publicField(this, "backdropParent");
    __publicField(this, "backdropExtraClasses");
    __publicField(this, "animationTarget");
    __publicField(this, "openNextOverlay");
    __publicField(this, "autoHide");
    __publicField(this, "toggleButtons");
    __publicField(this, "initContainer");
    __publicField(this, "isCloseWhenClickInside");
    __publicField(this, "isTabAccessibilityLimited");
    __publicField(this, "isLayoutAffect");
    __publicField(this, "hasAutofocus");
    __publicField(this, "hasAbilityToCloseOnBackdropClick");
    __publicField(this, "openedBreakpoint");
    __publicField(this, "autoClose");
    __publicField(this, "autoCloseEqualityType");
    __publicField(this, "moveOverlayToBody");
    __publicField(this, "backdrop");
    __publicField(this, "onElementClickListener");
    __publicField(this, "onOverlayClickListener");
    __publicField(this, "onBackdropClickListener");
    this.toggleButtons = Array.from(document.querySelectorAll(`[data-hs-overlay="#${this.el.id}"]`));
    const toggleDataOptions = this.collectToggleParameters(this.toggleButtons);
    const data = el.getAttribute("data-hs-overlay-options");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...toggleDataOptions,
      ...options
    };
    this.hiddenClass = (concatOptions == null ? void 0 : concatOptions.hiddenClass) || "hidden";
    this.emulateScrollbarSpace = (concatOptions == null ? void 0 : concatOptions.emulateScrollbarSpace) || false;
    this.isClosePrev = (concatOptions == null ? void 0 : concatOptions.isClosePrev) ?? true;
    this.backdropClasses = (concatOptions == null ? void 0 : concatOptions.backdropClasses) ?? "hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900";
    this.backdropParent = typeof concatOptions.backdropParent === "string" ? document.querySelector(concatOptions.backdropParent) : document.body;
    this.backdropExtraClasses = (concatOptions == null ? void 0 : concatOptions.backdropExtraClasses) ?? "";
    this.moveOverlayToBody = (concatOptions == null ? void 0 : concatOptions.moveOverlayToBody) || null;
    this.openNextOverlay = false;
    this.autoHide = null;
    this.initContainer = ((_a = this.el) == null ? void 0 : _a.parentElement) || null;
    this.isCloseWhenClickInside = stringToBoolean(getClassProperty(this.el, "--close-when-click-inside", "false") || "false");
    this.isTabAccessibilityLimited = stringToBoolean(getClassProperty(this.el, "--tab-accessibility-limited", "true") || "true");
    this.isLayoutAffect = stringToBoolean(getClassProperty(this.el, "--is-layout-affect", "false") || "false");
    this.hasAutofocus = stringToBoolean(getClassProperty(this.el, "--has-autofocus", "true") || "true");
    this.hasAbilityToCloseOnBackdropClick = stringToBoolean(this.el.getAttribute("data-hs-overlay-keyboard") || "true");
    const autoCloseBreakpoint = getClassProperty(this.el, "--auto-close");
    const autoCloseEqualityType = getClassProperty(this.el, "--auto-close-equality-type");
    const openedBreakpoint = getClassProperty(this.el, "--opened");
    this.autoClose = !isNaN(+autoCloseBreakpoint) && isFinite(+autoCloseBreakpoint) ? +autoCloseBreakpoint : BREAKPOINTS[autoCloseBreakpoint] || null;
    this.autoCloseEqualityType = autoCloseEqualityType ?? null;
    this.openedBreakpoint = (!isNaN(+openedBreakpoint) && isFinite(+openedBreakpoint) ? +openedBreakpoint : BREAKPOINTS[openedBreakpoint]) || null;
    this.animationTarget = ((_b = this == null ? void 0 : this.el) == null ? void 0 : _b.querySelector(".hs-overlay-animation-target")) || this.el;
    this.onElementClickListener = [];
    this.init();
  }
  elementClick() {
    if (this.el.classList.contains("opened")) this.close();
    else this.open();
  }
  overlayClick(evt) {
    if (evt.target.id && `#${evt.target.id}` === this.el.id && this.isCloseWhenClickInside && this.hasAbilityToCloseOnBackdropClick) {
      this.close();
    }
  }
  backdropClick() {
    this.close();
  }
  init() {
    this.createCollection(window.$hsOverlayCollection, this);
    if (this.isLayoutAffect && this.openedBreakpoint) {
      const instance = _HSOverlay.getInstance(this.el, true);
      _HSOverlay.setOpened(
        this.openedBreakpoint,
        instance
      );
    }
    this.onOverlayClickListener = (evt) => this.overlayClick(evt);
    this.el.addEventListener("click", this.onOverlayClickListener);
    if (this.toggleButtons.length) this.buildToggleButtons();
  }
  buildToggleButtons() {
    this.toggleButtons.forEach((el) => {
      if (this.el.classList.contains("opened")) el.ariaExpanded = "true";
      else el.ariaExpanded = "false";
      this.onElementClickListener.push({
        el,
        fn: () => this.elementClick()
      });
      el.addEventListener("click", this.onElementClickListener.find((toggleButton) => toggleButton.el === el).fn);
    });
  }
  hideAuto() {
    const time = parseInt(getClassProperty(this.el, "--auto-hide", "0"));
    if (time) {
      this.autoHide = setTimeout(() => {
        this.close();
      }, time);
    }
  }
  checkTimer() {
    if (this.autoHide) {
      clearTimeout(this.autoHide);
      this.autoHide = null;
    }
  }
  buildBackdrop() {
    const overlayClasses = this.el.classList.value.split(" ");
    const overlayZIndex = parseInt(
      window.getComputedStyle(this.el).getPropertyValue("z-index")
    );
    const backdropId = this.el.getAttribute("data-hs-overlay-backdrop-container") || false;
    this.backdrop = document.createElement("div");
    let backdropClasses = `${this.backdropClasses} ${this.backdropExtraClasses}`;
    const closeOnBackdrop = getClassProperty(this.el, "--overlay-backdrop", "true") !== "static";
    const disableBackdrop = getClassProperty(this.el, "--overlay-backdrop", "true") === "false";
    this.backdrop.id = `${this.el.id}-backdrop`;
    if ("style" in this.backdrop)
      this.backdrop.style.zIndex = `${overlayZIndex - 1}`;
    for (const value of overlayClasses) {
      if (value.startsWith("hs-overlay-backdrop-open:") || value.includes(":hs-overlay-backdrop-open:")) {
        backdropClasses += ` ${value}`;
      }
    }
    if (disableBackdrop) return;
    if (backdropId) {
      this.backdrop = document.querySelector(backdropId).cloneNode(true);
      this.backdrop.classList.remove("hidden");
      backdropClasses = `${this.backdrop.classList.toString()}`;
      this.backdrop.classList.value = "";
    }
    if (closeOnBackdrop) {
      this.onBackdropClickListener = () => this.backdropClick();
      this.backdrop.addEventListener(
        "click",
        this.onBackdropClickListener,
        true
      );
    }
    this.backdrop.setAttribute("data-hs-overlay-backdrop-template", "");
    this.backdropParent.appendChild(this.backdrop);
    setTimeout(() => {
      this.backdrop.classList.value = backdropClasses;
    });
  }
  destroyBackdrop() {
    const backdrop = document.querySelector(
      `#${this.el.id}-backdrop`
    );
    if (!backdrop) return;
    if (this.openNextOverlay) {
      backdrop.style.transitionDuration = `${parseFloat(
        window.getComputedStyle(backdrop).transitionDuration.replace(/[^\d.-]/g, "")
      ) * 1.8}s`;
    }
    backdrop.classList.add("opacity-0");
    afterTransition(backdrop, () => {
      backdrop.remove();
    });
  }
  focusElement() {
    const input = this.el.querySelector("[autofocus]");
    if (!input) return false;
    else input.focus();
  }
  getScrollbarSize() {
    let div = document.createElement("div");
    div.style.overflow = "scroll";
    div.style.width = "100px";
    div.style.height = "100px";
    document.body.appendChild(div);
    let scrollbarSize = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarSize;
  }
  collectToggleParameters(buttons) {
    let toggleData = {};
    buttons.forEach((el) => {
      const data = el.getAttribute("data-hs-overlay-options");
      const dataOptions = data ? JSON.parse(data) : {};
      toggleData = {
        ...toggleData,
        ...dataOptions
      };
    });
    return toggleData;
  }
  // Public methods
  open() {
    const openedOverlays = document.querySelectorAll(".hs-overlay.open");
    const currentlyOpened = window.$hsOverlayCollection.find(
      (el) => Array.from(openedOverlays).includes(el.element.el) && !el.element.isLayoutAffect
    );
    const toggles = document.querySelectorAll(
      `[data-hs-overlay="#${this.el.id}"]`
    );
    const disabledScroll = getClassProperty(this.el, "--body-scroll", "false") !== "true";
    if (this.isClosePrev && currentlyOpened) {
      this.openNextOverlay = true;
      return currentlyOpened.element.close().then(() => {
        this.open();
        this.openNextOverlay = false;
      });
    }
    if (disabledScroll) {
      document.body.style.overflow = "hidden";
      if (this.emulateScrollbarSpace)
        document.body.style.paddingRight = `${this.getScrollbarSize()}px`;
    }
    this.buildBackdrop();
    this.checkTimer();
    this.hideAuto();
    toggles.forEach((toggle) => {
      if (toggle.ariaExpanded) toggle.ariaExpanded = "true";
    });
    this.el.classList.remove(this.hiddenClass);
    this.el.setAttribute("aria-overlay", "true");
    this.el.setAttribute("tabindex", "-1");
    setTimeout(() => {
      if (this.el.classList.contains("opened")) return false;
      this.el.classList.add("open", "opened");
      if (this.isLayoutAffect) document.body.classList.add("hs-overlay-body-open");
      this.fireEvent("open", this.el);
      dispatch("open.hs.overlay", this.el, this.el);
      if (this.hasAutofocus) this.focusElement();
    }, 50);
  }
  close(forceClose = false) {
    if (this.isLayoutAffect)
      document.body.classList.remove("hs-overlay-body-open");
    const closeFn = (cb) => {
      if (this.el.classList.contains("open")) return false;
      const toggles = document.querySelectorAll(
        `[data-hs-overlay="#${this.el.id}"]`
      );
      toggles.forEach((toggle) => {
        if (toggle.ariaExpanded) toggle.ariaExpanded = "false";
      });
      this.el.classList.add(this.hiddenClass);
      this.destroyBackdrop();
      this.fireEvent("close", this.el);
      dispatch("close.hs.overlay", this.el, this.el);
      if (!document.querySelector(".hs-overlay.opened")) {
        document.body.style.overflow = "";
        if (this.emulateScrollbarSpace) document.body.style.paddingRight = "";
      }
      cb(this.el);
    };
    return new Promise((resolve) => {
      this.el.classList.remove("open", "opened");
      this.el.removeAttribute("aria-overlay");
      this.el.removeAttribute("tabindex");
      if (forceClose) closeFn(resolve);
      else afterTransition(this.animationTarget, () => closeFn(resolve));
    });
  }
  destroy() {
    this.el.classList.remove("open", "opened", this.hiddenClass);
    if (this.isLayoutAffect)
      document.body.classList.remove("hs-overlay-body-open");
    this.el.removeEventListener("click", this.onOverlayClickListener);
    if (this.onElementClickListener.length) {
      this.onElementClickListener.forEach(({ el, fn: fn2 }) => {
        el.removeEventListener("click", fn2);
      });
      this.onElementClickListener = null;
    }
    if (this.backdrop)
      this.backdrop.removeEventListener("click", this.onBackdropClickListener);
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = null;
    }
    window.$hsOverlayCollection = window.$hsOverlayCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsOverlayCollection.find((el) => {
      if (target instanceof _HSOverlay) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance) {
    const _temp = typeof target === "string" ? document.querySelector(target) : target;
    const _target = (_temp == null ? void 0 : _temp.getAttribute("data-hs-overlay")) ? _temp.getAttribute("data-hs-overlay") : target;
    const elInCollection = window.$hsOverlayCollection.find(
      (el) => el.element.el === (typeof _target === "string" ? document.querySelector(_target) : _target) || el.element.el === (typeof _target === "string" ? document.querySelector(_target) : _target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsOverlayCollection) {
      window.$hsOverlayCollection = [];
      document.addEventListener(
        "keydown",
        (evt) => _HSOverlay.accessibility(evt)
      );
    }
    if (window.$hsOverlayCollection)
      window.$hsOverlayCollection = window.$hsOverlayCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(".hs-overlay:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsOverlayCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSOverlay(el);
    });
  }
  static open(target) {
    const instance = _HSOverlay.findInCollection(target);
    if (instance && instance.element.el.classList.contains(instance.element.hiddenClass)) instance.element.open();
  }
  static close(target) {
    const instance = _HSOverlay.findInCollection(target);
    if (instance && !instance.element.el.classList.contains(instance.element.hiddenClass)) instance.element.close();
  }
  static setOpened(breakpoint, el) {
    if (document.body.clientWidth >= breakpoint) {
      document.body.classList.add("hs-overlay-body-open");
      el.element.open();
    } else el.element.close(true);
  }
  // Accessibility methods
  static accessibility(evt) {
    var _a, _b;
    const targets = window.$hsOverlayCollection.filter(
      (el) => el.element.el.classList.contains("open")
    );
    const target = targets[targets.length - 1];
    const focusableElements = (_b = (_a = target == null ? void 0 : target.element) == null ? void 0 : _a.el) == null ? void 0 : _b.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const notHiddenFocusableElements = [];
    if (focusableElements == null ? void 0 : focusableElements.length)
      focusableElements.forEach((el) => {
        if (!isParentOrElementHidden(el)) notHiddenFocusableElements.push(el);
      });
    const basicCheck = target && !evt.metaKey;
    if (basicCheck && !target.element.isTabAccessibilityLimited && evt.code === "Tab")
      return false;
    if (basicCheck && notHiddenFocusableElements.length && evt.code === "Tab") {
      evt.preventDefault();
      this.onTab(target);
    }
    if (basicCheck && evt.code === "Escape") {
      evt.preventDefault();
      this.onEscape(target);
    }
  }
  static onEscape(target) {
    if (target && target.element.hasAbilityToCloseOnBackdropClick)
      target.element.close();
  }
  static onTab(target) {
    const overlayElement = target.element.el;
    const focusableElements = Array.from(
      overlayElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusableElements.length === 0) return false;
    const focusedElement = overlayElement.querySelector(":focus");
    if (focusedElement) {
      let foundCurrent = false;
      for (const element of focusableElements) {
        if (foundCurrent) {
          element.focus();
          return;
        }
        if (element === focusedElement) {
          foundCurrent = true;
        }
      }
      focusableElements[0].focus();
    } else {
      focusableElements[0].focus();
    }
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSOverlay.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
var autoCloseResizeFn = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((el) => el.element.autoClose))
    return false;
  const overlays = window.$hsOverlayCollection.filter(
    (el) => el.element.autoClose
  );
  overlays.forEach((overlay) => {
    const { autoCloseEqualityType, autoClose } = overlay.element;
    const condition = autoCloseEqualityType === "less-than" ? document.body.clientWidth <= autoClose : document.body.clientWidth >= autoClose;
    if (condition) {
      overlay.element.close(true);
    }
  });
};
var moveOverlayToBodyResizeFn = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((el) => el.element.moveOverlayToBody))
    return false;
  const overlays = window.$hsOverlayCollection.filter(
    (el) => el.element.moveOverlayToBody
  );
  overlays.forEach((overlay) => {
    const resolution = overlay.element.moveOverlayToBody;
    const initPlace = overlay.element.initContainer;
    const newPlace = document.querySelector("body");
    const target = overlay.element.el;
    if (!initPlace && target) return false;
    if (document.body.clientWidth <= resolution && !isDirectChild(newPlace, target))
      newPlace.appendChild(target);
    else if (document.body.clientWidth > resolution && !initPlace.contains(target))
      initPlace.appendChild(target);
  });
};
var setOpenedResizeFn = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((el) => el.element.autoClose))
    return false;
  const overlays = window.$hsOverlayCollection.filter(
    (el) => el.element.autoClose
  );
  overlays.forEach((overlay) => {
    const { autoCloseEqualityType, autoClose } = overlay.element;
    const condition = autoCloseEqualityType === "less-than" ? document.body.clientWidth <= autoClose : document.body.clientWidth >= autoClose;
    if (condition) {
      overlay.element.close(true);
    }
  });
};
var setBackdropZIndexResizeFn = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((el) => el.element.el.classList.contains("opened")))
    return false;
  const overlays = window.$hsOverlayCollection.filter((el) => el.element.el.classList.contains("opened"));
  overlays.forEach((overlay) => {
    const overlayZIndex = parseInt(window.getComputedStyle(overlay.element.el).getPropertyValue("z-index"));
    const backdrop = document.querySelector(`#${overlay.element.el.id}-backdrop`);
    if (!backdrop) return false;
    const backdropZIndex = parseInt(window.getComputedStyle(backdrop).getPropertyValue("z-index"));
    if (overlayZIndex === backdropZIndex + 1) return false;
    if ("style" in backdrop) backdrop.style.zIndex = `${overlayZIndex - 1}`;
    document.body.classList.add("hs-overlay-body-open");
  });
};
window.addEventListener("load", () => {
  HSOverlay.autoInit();
  moveOverlayToBodyResizeFn();
});
window.addEventListener("resize", () => {
  autoCloseResizeFn();
  moveOverlayToBodyResizeFn();
  setOpenedResizeFn();
  setBackdropZIndexResizeFn();
});
if (typeof window !== "undefined") {
  window.HSOverlay = HSOverlay;
}
var overlay_default = HSOverlay;

// node_modules/preline/src/plugins/pin-input/index.ts
init_utils();
init_base_plugin();
var HSPinInput = class _HSPinInput extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "items");
    __publicField(this, "currentItem");
    __publicField(this, "currentValue");
    __publicField(this, "placeholders");
    __publicField(this, "availableCharsRE");
    __publicField(this, "onElementInputListener");
    __publicField(this, "onElementPasteListener");
    __publicField(this, "onElementKeydownListener");
    __publicField(this, "onElementFocusinListener");
    __publicField(this, "onElementFocusoutListener");
    const data = el.getAttribute("data-hs-pin-input");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.items = this.el.querySelectorAll("[data-hs-pin-input-item]");
    this.currentItem = null;
    this.currentValue = new Array(this.items.length).fill("");
    this.placeholders = [];
    this.availableCharsRE = new RegExp(
      (concatOptions == null ? void 0 : concatOptions.availableCharsRE) || "^[a-zA-Z0-9]+$"
    );
    this.onElementInputListener = [];
    this.onElementPasteListener = [];
    this.onElementKeydownListener = [];
    this.onElementFocusinListener = [];
    this.onElementFocusoutListener = [];
    this.init();
  }
  elementInput(evt, index) {
    this.onInput(evt, index);
  }
  elementPaste(evt) {
    this.onPaste(evt);
  }
  elementKeydown(evt, index) {
    this.onKeydown(evt, index);
  }
  elementFocusin(index) {
    this.onFocusIn(index);
  }
  elementFocusout(index) {
    this.onFocusOut(index);
  }
  init() {
    this.createCollection(window.$hsPinInputCollection, this);
    if (this.items.length) this.build();
  }
  build() {
    this.buildInputItems();
  }
  buildInputItems() {
    this.items.forEach((el, index) => {
      this.placeholders.push(el.getAttribute("placeholder") || "");
      if (el.hasAttribute("autofocus")) this.onFocusIn(index);
      this.onElementInputListener.push({
        el,
        fn: (evt) => this.elementInput(evt, index)
      });
      this.onElementPasteListener.push({
        el,
        fn: (evt) => this.elementPaste(evt)
      });
      this.onElementKeydownListener.push({
        el,
        fn: (evt) => this.elementKeydown(evt, index)
      });
      this.onElementFocusinListener.push({
        el,
        fn: () => this.elementFocusin(index)
      });
      this.onElementFocusoutListener.push({
        el,
        fn: () => this.elementFocusout(index)
      });
      el.addEventListener(
        "input",
        this.onElementInputListener.find((elI) => elI.el === el).fn
      );
      el.addEventListener(
        "paste",
        this.onElementPasteListener.find((elI) => elI.el === el).fn
      );
      el.addEventListener(
        "keydown",
        this.onElementKeydownListener.find((elI) => elI.el === el).fn
      );
      el.addEventListener(
        "focusin",
        this.onElementFocusinListener.find((elI) => elI.el === el).fn
      );
      el.addEventListener(
        "focusout",
        this.onElementFocusoutListener.find((elI) => elI.el === el).fn
      );
    });
  }
  checkIfNumber(value) {
    return value.match(this.availableCharsRE);
  }
  autoFillAll(text) {
    Array.from(text).forEach((n, i) => {
      if (!(this == null ? void 0 : this.items[i])) return false;
      this.items[i].value = n;
      this.items[i].dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
  setCurrentValue() {
    this.currentValue = Array.from(this.items).map(
      (el) => el.value
    );
  }
  toggleCompleted() {
    if (!this.currentValue.includes("")) this.el.classList.add("active");
    else this.el.classList.remove("active");
  }
  onInput(evt, index) {
    const originalValue = evt.target.value;
    this.currentItem = evt.target;
    this.currentItem.value = "";
    this.currentItem.value = originalValue[originalValue.length - 1];
    if (!this.checkIfNumber(this.currentItem.value)) {
      this.currentItem.value = this.currentValue[index] || "";
      return false;
    }
    this.setCurrentValue();
    if (this.currentItem.value) {
      if (index < this.items.length - 1) this.items[index + 1].focus();
      if (!this.currentValue.includes("")) {
        const payload = { currentValue: this.currentValue };
        this.fireEvent("completed", payload);
        dispatch("completed.hs.pinInput", this.el, payload);
      }
      this.toggleCompleted();
    } else {
      if (index > 0) this.items[index - 1].focus();
    }
  }
  onKeydown(evt, index) {
    if (evt.key === "Backspace" && index > 0) {
      if (this.items[index].value === "") {
        this.items[index - 1].value = "";
        this.items[index - 1].focus();
      } else {
        this.items[index].value = "";
      }
    }
    this.setCurrentValue();
    this.toggleCompleted();
  }
  onFocusIn(index) {
    this.items[index].setAttribute("placeholder", "");
  }
  onFocusOut(index) {
    this.items[index].setAttribute("placeholder", this.placeholders[index]);
  }
  onPaste(evt) {
    evt.preventDefault();
    this.items.forEach((el) => {
      if (document.activeElement === el)
        this.autoFillAll(evt.clipboardData.getData("text"));
    });
  }
  // Public methods
  destroy() {
    this.el.classList.remove("active");
    if (this.items.length)
      this.items.forEach((el) => {
        el.removeEventListener(
          "input",
          this.onElementInputListener.find((elI) => elI.el === el).fn
        );
        el.removeEventListener(
          "paste",
          this.onElementPasteListener.find((elI) => elI.el === el).fn
        );
        el.removeEventListener(
          "keydown",
          this.onElementKeydownListener.find((elI) => elI.el === el).fn
        );
        el.removeEventListener(
          "focusin",
          this.onElementFocusinListener.find((elI) => elI.el === el).fn
        );
        el.removeEventListener(
          "focusout",
          this.onElementFocusoutListener.find((elI) => elI.el === el).fn
        );
      });
    this.items = null;
    this.currentItem = null;
    this.currentValue = null;
    window.$hsPinInputCollection = window.$hsPinInputCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static method
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsPinInputCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsPinInputCollection) window.$hsPinInputCollection = [];
    if (window.$hsPinInputCollection)
      window.$hsPinInputCollection = window.$hsPinInputCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsPinInputCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSPinInput(el);
    });
  }
};
window.addEventListener("load", () => {
  HSPinInput.autoInit();
});
if (typeof window !== "undefined") {
  window.HSPinInput = HSPinInput;
}
var pin_input_default = HSPinInput;

// node_modules/preline/src/plugins/remove-element/index.ts
init_utils();
init_base_plugin();
var HSRemoveElement = class _HSRemoveElement extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "removeTargetId");
    __publicField(this, "removeTarget");
    __publicField(this, "removeTargetAnimationClass");
    __publicField(this, "onElementClickListener");
    const data = el.getAttribute("data-hs-remove-element-options");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.removeTargetId = this.el.getAttribute("data-hs-remove-element");
    this.removeTarget = document.querySelector(this.removeTargetId);
    this.removeTargetAnimationClass = (concatOptions == null ? void 0 : concatOptions.removeTargetAnimationClass) || "hs-removing";
    if (this.removeTarget) this.init();
  }
  elementClick() {
    this.remove();
  }
  init() {
    this.createCollection(window.$hsRemoveElementCollection, this);
    this.onElementClickListener = () => this.elementClick();
    this.el.addEventListener("click", this.onElementClickListener);
  }
  remove() {
    if (!this.removeTarget) return false;
    this.removeTarget.classList.add(this.removeTargetAnimationClass);
    afterTransition(
      this.removeTarget,
      () => setTimeout(() => this.removeTarget.remove())
    );
  }
  // Public methods
  destroy() {
    this.removeTarget.classList.remove(this.removeTargetAnimationClass);
    this.el.removeEventListener("click", this.onElementClickListener);
    window.$hsRemoveElementCollection = window.$hsRemoveElementCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static method
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsRemoveElementCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target) || el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsRemoveElementCollection)
      window.$hsRemoveElementCollection = [];
    if (window.$hsRemoveElementCollection)
      window.$hsRemoveElementCollection = window.$hsRemoveElementCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-remove-element]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsRemoveElementCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSRemoveElement(el);
    });
  }
};
window.addEventListener("load", () => {
  HSRemoveElement.autoInit();
});
if (typeof window !== "undefined") {
  window.HSRemoveElement = HSRemoveElement;
}
var remove_element_default = HSRemoveElement;

// node_modules/preline/src/plugins/scrollspy/index.ts
init_utils();
init_base_plugin();
var HSScrollspy = class _HSScrollspy extends HSBasePlugin {
  constructor(el, options = {}) {
    super(el, options);
    __publicField(this, "activeSection");
    __publicField(this, "contentId");
    __publicField(this, "content");
    __publicField(this, "links");
    __publicField(this, "sections");
    __publicField(this, "scrollableId");
    __publicField(this, "scrollable");
    __publicField(this, "onScrollableScrollListener");
    __publicField(this, "onLinkClickListener");
    this.activeSection = null;
    this.contentId = this.el.getAttribute("data-hs-scrollspy");
    this.content = document.querySelector(this.contentId);
    this.links = this.el.querySelectorAll("[href]");
    this.sections = [];
    this.scrollableId = this.el.getAttribute(
      "data-hs-scrollspy-scrollable-parent"
    );
    this.scrollable = this.scrollableId ? document.querySelector(this.scrollableId) : document;
    this.onLinkClickListener = [];
    this.init();
  }
  scrollableScroll(evt) {
    Array.from(this.sections).forEach((section) => {
      if (!section.getAttribute("id")) return false;
      this.update(evt, section);
    });
  }
  linkClick(evt, el) {
    evt.preventDefault();
    if (el.getAttribute("href") === "javascript:;") return false;
    this.scrollTo(el);
  }
  init() {
    this.createCollection(window.$hsScrollspyCollection, this);
    this.links.forEach((el) => {
      this.sections.push(
        this.scrollable.querySelector(el.getAttribute("href"))
      );
    });
    this.onScrollableScrollListener = (evt) => this.scrollableScroll(evt);
    this.scrollable.addEventListener("scroll", this.onScrollableScrollListener);
    this.links.forEach((el) => {
      this.onLinkClickListener.push({
        el,
        fn: (evt) => this.linkClick(evt, el)
      });
      el.addEventListener(
        "click",
        this.onLinkClickListener.find((link) => link.el === el).fn
      );
    });
  }
  update(evt, section) {
    const globalOffset = parseInt(
      getClassProperty(this.el, "--scrollspy-offset", "0")
    );
    const userOffset = parseInt(getClassProperty(section, "--scrollspy-offset")) || globalOffset;
    const scrollableParentOffset = evt.target === document ? 0 : parseInt(
      String(evt.target.getBoundingClientRect().top)
    );
    const topOffset = parseInt(String(section.getBoundingClientRect().top)) - userOffset - scrollableParentOffset;
    const height = section.offsetHeight;
    if (topOffset <= 0 && topOffset + height > 0) {
      if (this.activeSection === section) return false;
      this.links.forEach((el) => {
        el.classList.remove("active");
      });
      const current = this.el.querySelector(
        `[href="#${section.getAttribute("id")}"]`
      );
      if (current) {
        current.classList.add("active");
        const group = current.closest("[data-hs-scrollspy-group]");
        if (group) {
          const parentLink = group.querySelector("[href]");
          if (parentLink) parentLink.classList.add("active");
        }
      }
      this.activeSection = section;
    }
  }
  scrollTo(link) {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    const globalOffset = parseInt(
      getClassProperty(this.el, "--scrollspy-offset", "0")
    );
    const userOffset = parseInt(getClassProperty(target, "--scrollspy-offset")) || globalOffset;
    const scrollableParentOffset = this.scrollable === document ? 0 : this.scrollable.offsetTop;
    const topOffset = target.offsetTop - userOffset - scrollableParentOffset;
    const view = this.scrollable === document ? window : this.scrollable;
    const scrollFn = () => {
      window.history.replaceState(null, null, link.getAttribute("href"));
      if ("scrollTo" in view) {
        view.scrollTo({
          top: topOffset,
          left: 0,
          behavior: "smooth"
        });
      }
    };
    const beforeScroll = this.fireEvent("beforeScroll", this.el);
    dispatch("beforeScroll.hs.scrollspy", this.el, this.el);
    if (beforeScroll instanceof Promise) beforeScroll.then(() => scrollFn());
    else scrollFn();
  }
  // Public methods
  destroy() {
    const activeLink = this.el.querySelector("[href].active");
    activeLink.classList.remove("active");
    this.scrollable.removeEventListener(
      "scroll",
      this.onScrollableScrollListener
    );
    if (this.onLinkClickListener.length)
      this.onLinkClickListener.forEach(({ el, fn: fn2 }) => {
        el.removeEventListener("click", fn2);
      });
    window.$hsScrollspyCollection = window.$hsScrollspyCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance = false) {
    const elInCollection = window.$hsScrollspyCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsScrollspyCollection) window.$hsScrollspyCollection = [];
    if (window.$hsScrollspyCollection)
      window.$hsScrollspyCollection = window.$hsScrollspyCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-scrollspy]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsScrollspyCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSScrollspy(el);
    });
  }
};
window.addEventListener("load", () => {
  HSScrollspy.autoInit();
});
if (typeof window !== "undefined") {
  window.HSScrollspy = HSScrollspy;
}
var scrollspy_default = HSScrollspy;

// node_modules/preline/src/plugins/select/index.ts
init_utils();
init_base_plugin();
var HSSelect = class _HSSelect extends HSBasePlugin {
  constructor(el, options) {
    var _a, _b;
    super(el, options);
    __publicField(this, "value");
    __publicField(this, "placeholder");
    __publicField(this, "hasSearch");
    __publicField(this, "minSearchLength");
    __publicField(this, "preventSearchFocus");
    __publicField(this, "mode");
    __publicField(this, "viewport");
    __publicField(this, "isOpened");
    __publicField(this, "isMultiple");
    __publicField(this, "isDisabled");
    __publicField(this, "selectedItems");
    __publicField(this, "apiUrl");
    __publicField(this, "apiQuery");
    __publicField(this, "apiOptions");
    __publicField(this, "apiDataPart");
    __publicField(this, "apiSearchQueryKey");
    __publicField(this, "apiFieldsMap");
    __publicField(this, "apiIconTag");
    __publicField(this, "toggleTag");
    __publicField(this, "toggleClasses");
    __publicField(this, "toggleSeparators");
    __publicField(this, "toggleCountText");
    __publicField(this, "toggleCountTextPlacement");
    __publicField(this, "toggleCountTextMinItems");
    __publicField(this, "toggleCountTextMode");
    __publicField(this, "wrapperClasses");
    __publicField(this, "tagsItemTemplate");
    __publicField(this, "tagsItemClasses");
    __publicField(this, "tagsInputId");
    __publicField(this, "tagsInputClasses");
    __publicField(this, "dropdownTag");
    __publicField(this, "dropdownClasses");
    __publicField(this, "dropdownDirectionClasses");
    __publicField(this, "dropdownSpace");
    __publicField(this, "dropdownPlacement");
    __publicField(this, "dropdownVerticalFixedPlacement");
    __publicField(this, "dropdownScope");
    __publicField(this, "searchTemplate");
    __publicField(this, "searchWrapperTemplate");
    __publicField(this, "searchPlaceholder");
    __publicField(this, "searchId");
    __publicField(this, "searchLimit");
    __publicField(this, "isSearchDirectMatch");
    __publicField(this, "searchClasses");
    __publicField(this, "searchWrapperClasses");
    __publicField(this, "searchNoResultTemplate");
    __publicField(this, "searchNoResultText");
    __publicField(this, "searchNoResultClasses");
    __publicField(this, "optionAllowEmptyOption");
    __publicField(this, "optionTag");
    __publicField(this, "optionTemplate");
    __publicField(this, "optionClasses");
    __publicField(this, "descriptionClasses");
    __publicField(this, "iconClasses");
    __publicField(this, "animationInProcess");
    __publicField(this, "wrapper");
    __publicField(this, "toggle");
    __publicField(this, "toggleTextWrapper");
    __publicField(this, "tagsInput");
    __publicField(this, "dropdown");
    __publicField(this, "popperInstance");
    __publicField(this, "searchWrapper");
    __publicField(this, "search");
    __publicField(this, "searchNoResult");
    __publicField(this, "selectOptions");
    __publicField(this, "extraMarkup");
    __publicField(this, "isAddTagOnEnter");
    __publicField(this, "tagsInputHelper");
    __publicField(this, "remoteOptions");
    __publicField(this, "optionId", 0);
    __publicField(this, "onWrapperClickListener");
    __publicField(this, "onToggleClickListener");
    __publicField(this, "onTagsInputFocusListener");
    __publicField(this, "onTagsInputInputListener");
    __publicField(this, "onTagsInputInputSecondListener");
    __publicField(this, "onTagsInputKeydownListener");
    __publicField(this, "onSearchInputListener");
    const data = el.getAttribute("data-hs-select");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.value = (concatOptions == null ? void 0 : concatOptions.value) || this.el.value || null;
    this.placeholder = (concatOptions == null ? void 0 : concatOptions.placeholder) || "Select...";
    this.hasSearch = (concatOptions == null ? void 0 : concatOptions.hasSearch) || false;
    this.minSearchLength = (concatOptions == null ? void 0 : concatOptions.minSearchLength) ?? 0;
    this.preventSearchFocus = (concatOptions == null ? void 0 : concatOptions.preventSearchFocus) || false;
    this.mode = (concatOptions == null ? void 0 : concatOptions.mode) || "default";
    this.viewport = typeof (concatOptions == null ? void 0 : concatOptions.viewport) !== "undefined" ? document.querySelector(concatOptions == null ? void 0 : concatOptions.viewport) : null;
    this.isOpened = Boolean(concatOptions == null ? void 0 : concatOptions.isOpened) || false;
    this.isMultiple = this.el.hasAttribute("multiple") || false;
    this.isDisabled = this.el.hasAttribute("disabled") || false;
    this.selectedItems = [];
    this.apiUrl = (concatOptions == null ? void 0 : concatOptions.apiUrl) || null;
    this.apiQuery = (concatOptions == null ? void 0 : concatOptions.apiQuery) || null;
    this.apiOptions = (concatOptions == null ? void 0 : concatOptions.apiOptions) || null;
    this.apiSearchQueryKey = (concatOptions == null ? void 0 : concatOptions.apiSearchQueryKey) || null;
    this.apiDataPart = (concatOptions == null ? void 0 : concatOptions.apiDataPart) || null;
    this.apiFieldsMap = (concatOptions == null ? void 0 : concatOptions.apiFieldsMap) || null;
    this.apiIconTag = (concatOptions == null ? void 0 : concatOptions.apiIconTag) || null;
    this.wrapperClasses = (concatOptions == null ? void 0 : concatOptions.wrapperClasses) || null;
    this.toggleTag = (concatOptions == null ? void 0 : concatOptions.toggleTag) || null;
    this.toggleClasses = (concatOptions == null ? void 0 : concatOptions.toggleClasses) || null;
    this.toggleCountText = typeof (concatOptions == null ? void 0 : concatOptions.toggleCountText) === void 0 ? null : concatOptions.toggleCountText;
    this.toggleCountTextPlacement = (concatOptions == null ? void 0 : concatOptions.toggleCountTextPlacement) || "postfix";
    this.toggleCountTextMinItems = (concatOptions == null ? void 0 : concatOptions.toggleCountTextMinItems) || 1;
    this.toggleCountTextMode = (concatOptions == null ? void 0 : concatOptions.toggleCountTextMode) || "countAfterLimit";
    this.toggleSeparators = {
      items: ((_a = concatOptions == null ? void 0 : concatOptions.toggleSeparators) == null ? void 0 : _a.items) || ", ",
      betweenItemsAndCounter: ((_b = concatOptions == null ? void 0 : concatOptions.toggleSeparators) == null ? void 0 : _b.betweenItemsAndCounter) || "and"
    };
    this.tagsItemTemplate = (concatOptions == null ? void 0 : concatOptions.tagsItemTemplate) || null;
    this.tagsItemClasses = (concatOptions == null ? void 0 : concatOptions.tagsItemClasses) || null;
    this.tagsInputId = (concatOptions == null ? void 0 : concatOptions.tagsInputId) || null;
    this.tagsInputClasses = (concatOptions == null ? void 0 : concatOptions.tagsInputClasses) || null;
    this.dropdownTag = (concatOptions == null ? void 0 : concatOptions.dropdownTag) || null;
    this.dropdownClasses = (concatOptions == null ? void 0 : concatOptions.dropdownClasses) || null;
    this.dropdownDirectionClasses = (concatOptions == null ? void 0 : concatOptions.dropdownDirectionClasses) || null;
    this.dropdownSpace = (concatOptions == null ? void 0 : concatOptions.dropdownSpace) || 10;
    this.dropdownPlacement = (concatOptions == null ? void 0 : concatOptions.dropdownPlacement) || null;
    this.dropdownVerticalFixedPlacement = (concatOptions == null ? void 0 : concatOptions.dropdownVerticalFixedPlacement) || null;
    this.dropdownScope = (concatOptions == null ? void 0 : concatOptions.dropdownScope) || "parent";
    this.searchTemplate = (concatOptions == null ? void 0 : concatOptions.searchTemplate) || null;
    this.searchWrapperTemplate = (concatOptions == null ? void 0 : concatOptions.searchWrapperTemplate) || null;
    this.searchWrapperClasses = (concatOptions == null ? void 0 : concatOptions.searchWrapperClasses) || "bg-white p-2 sticky top-0";
    this.searchId = (concatOptions == null ? void 0 : concatOptions.searchId) || null;
    this.searchLimit = (concatOptions == null ? void 0 : concatOptions.searchLimit) || Infinity;
    this.isSearchDirectMatch = typeof (concatOptions == null ? void 0 : concatOptions.isSearchDirectMatch) !== "undefined" ? concatOptions == null ? void 0 : concatOptions.isSearchDirectMatch : true;
    this.searchClasses = (concatOptions == null ? void 0 : concatOptions.searchClasses) || "block w-[calc(100%-2rem)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4";
    this.searchPlaceholder = (concatOptions == null ? void 0 : concatOptions.searchPlaceholder) || "Search...";
    this.searchNoResultTemplate = (concatOptions == null ? void 0 : concatOptions.searchNoResultTemplate) || "<span></span>";
    this.searchNoResultText = (concatOptions == null ? void 0 : concatOptions.searchNoResultText) || "No results found";
    this.searchNoResultClasses = (concatOptions == null ? void 0 : concatOptions.searchNoResultClasses) || "px-4 text-sm text-gray-800 dark:text-neutral-200";
    this.optionAllowEmptyOption = typeof (concatOptions == null ? void 0 : concatOptions.optionAllowEmptyOption) !== "undefined" ? concatOptions == null ? void 0 : concatOptions.optionAllowEmptyOption : false;
    this.optionTemplate = (concatOptions == null ? void 0 : concatOptions.optionTemplate) || null;
    this.optionTag = (concatOptions == null ? void 0 : concatOptions.optionTag) || null;
    this.optionClasses = (concatOptions == null ? void 0 : concatOptions.optionClasses) || null;
    this.extraMarkup = (concatOptions == null ? void 0 : concatOptions.extraMarkup) || null;
    this.descriptionClasses = (concatOptions == null ? void 0 : concatOptions.descriptionClasses) || null;
    this.iconClasses = (concatOptions == null ? void 0 : concatOptions.iconClasses) || null;
    this.isAddTagOnEnter = (concatOptions == null ? void 0 : concatOptions.isAddTagOnEnter) ?? true;
    this.animationInProcess = false;
    this.selectOptions = [];
    this.remoteOptions = [];
    this.tagsInputHelper = null;
    this.init();
  }
  wrapperClick(evt) {
    if (!evt.target.closest("[data-hs-select-dropdown]") && !evt.target.closest("[data-tag-value]")) {
      this.tagsInput.focus();
    }
  }
  toggleClick() {
    if (this.isDisabled) return false;
    this.toggleFn();
  }
  tagsInputFocus() {
    if (!this.isOpened) this.open();
  }
  tagsInputInput() {
    this.calculateInputWidth();
  }
  tagsInputInputSecond(evt) {
    this.searchOptions(evt.target.value);
  }
  tagsInputKeydown(evt) {
    if (evt.key === "Enter" && this.isAddTagOnEnter) {
      const val = evt.target.value;
      if (this.selectOptions.find((el) => el.val === val))
        return false;
      this.addSelectOption(val, val);
      this.buildOption(val, val);
      this.dropdown.querySelector(`[data-value="${val}"]`).click();
      this.resetTagsInputField();
    }
  }
  searchInput(evt) {
    const newVal = evt.target.value;
    if (this.apiUrl) this.remoteSearch(newVal);
    else this.searchOptions(newVal);
  }
  setValue(val) {
    this.value = val;
    this.clearSelections();
    if (Array.isArray(val)) {
      if (this.mode === "tags") {
        this.unselectMultipleItems();
        this.selectMultipleItems();
        this.selectedItems = [];
        const existingTags = this.wrapper.querySelectorAll("[data-tag-value]");
        existingTags.forEach((tag) => tag.remove());
        this.setTagsItems();
        this.reassignTagsInputPlaceholder(this.value.length ? "" : this.placeholder);
      } else {
        this.toggleTextWrapper.innerHTML = this.value.length ? this.stringFromValue() : this.placeholder;
        this.unselectMultipleItems();
        this.selectMultipleItems();
      }
    } else {
      this.setToggleTitle();
      if (this.toggle.querySelector("[data-icon]")) this.setToggleIcon();
      if (this.toggle.querySelector("[data-title]")) this.setToggleTitle();
      this.selectSingleItem();
    }
  }
  init() {
    this.createCollection(window.$hsSelectCollection, this);
    this.build();
  }
  build() {
    this.el.style.display = "none";
    if (this.el.children) {
      Array.from(this.el.children).filter((el) => this.optionAllowEmptyOption || !this.optionAllowEmptyOption && el.value && el.value !== "").forEach((el) => {
        const data = el.getAttribute("data-hs-select-option");
        this.selectOptions = [
          ...this.selectOptions,
          {
            title: el.textContent,
            val: el.value,
            disabled: el.disabled,
            options: data !== "undefined" ? JSON.parse(data) : null
          }
        ];
      });
    }
    if (this.isMultiple) {
      const selectedOptions = Array.from(this.el.children).filter(
        (el) => el.selected
      );
      if (selectedOptions) {
        const values = [];
        selectedOptions.forEach((el) => {
          values.push(el.value);
        });
        this.value = values;
      }
    }
    this.buildWrapper();
    if (this.mode === "tags") this.buildTags();
    else this.buildToggle();
    this.buildDropdown();
    if (this.extraMarkup) this.buildExtraMarkup();
  }
  buildWrapper() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("hs-select", "relative");
    if (this.mode === "tags") {
      this.onWrapperClickListener = (evt) => this.wrapperClick(evt);
      this.wrapper.addEventListener("click", this.onWrapperClickListener);
    }
    if (this.wrapperClasses)
      classToClassList(this.wrapperClasses, this.wrapper);
    this.el.before(this.wrapper);
    this.wrapper.append(this.el);
  }
  buildExtraMarkup() {
    const appendMarkup = (markup) => {
      const el = htmlToElement(markup);
      this.wrapper.append(el);
      return el;
    };
    const clickHandle = (el) => {
      if (!el.classList.contains("--prevent-click"))
        el.addEventListener("click", (evt) => {
          evt.stopPropagation();
          this.toggleFn();
        });
    };
    if (Array.isArray(this.extraMarkup)) {
      this.extraMarkup.forEach((el) => {
        const newEl = appendMarkup(el);
        clickHandle(newEl);
      });
    } else {
      const newEl = appendMarkup(this.extraMarkup);
      clickHandle(newEl);
    }
  }
  buildToggle() {
    var _a, _b;
    let icon, title;
    this.toggleTextWrapper = document.createElement("span");
    this.toggleTextWrapper.classList.add("truncate");
    this.toggle = htmlToElement(this.toggleTag || "<div></div>");
    icon = this.toggle.querySelector("[data-icon]");
    title = this.toggle.querySelector("[data-title]");
    if (!this.isMultiple && icon) this.setToggleIcon();
    if (!this.isMultiple && title) this.setToggleTitle();
    if (this.isMultiple) {
      this.toggleTextWrapper.innerHTML = this.value.length ? this.stringFromValue() : this.placeholder;
    } else {
      this.toggleTextWrapper.innerHTML = ((_a = this.getItemByValue(this.value)) == null ? void 0 : _a.title) || this.placeholder;
    }
    if (!title) this.toggle.append(this.toggleTextWrapper);
    if (this.toggleClasses) classToClassList(this.toggleClasses, this.toggle);
    if (this.isDisabled) this.toggle.classList.add("disabled");
    if (this.wrapper) this.wrapper.append(this.toggle);
    if ((_b = this.toggle) == null ? void 0 : _b.ariaExpanded) {
      if (this.isOpened) this.toggle.ariaExpanded = "true";
      else this.toggle.ariaExpanded = "false";
    }
    this.onToggleClickListener = () => this.toggleClick();
    this.toggle.addEventListener("click", this.onToggleClickListener);
  }
  setToggleIcon() {
    var _a;
    const item = this.getItemByValue(this.value);
    const icon = this.toggle.querySelector("[data-icon]");
    if (icon) {
      icon.innerHTML = "";
      const img = htmlToElement(
        this.apiUrl && this.apiIconTag ? this.apiIconTag || "" : ((_a = item == null ? void 0 : item.options) == null ? void 0 : _a.icon) || ""
      );
      if (this.value && this.apiUrl && this.apiIconTag && item[this.apiFieldsMap.icon])
        img.src = item[this.apiFieldsMap.icon] || "";
      icon.append(img);
      if (!img) icon.classList.add("hidden");
      else icon.classList.remove("hidden");
    }
  }
  setToggleTitle() {
    var _a;
    const title = this.toggle.querySelector("[data-title]");
    if (title) {
      title.innerHTML = ((_a = this.getItemByValue(this.value)) == null ? void 0 : _a.title) || this.placeholder;
      title.classList.add("truncate");
      this.toggle.append(title);
    }
  }
  buildTags() {
    if (this.isDisabled) this.wrapper.classList.add("disabled");
    this.buildTagsInput();
    this.setTagsItems();
  }
  reassignTagsInputPlaceholder(placeholder) {
    this.tagsInput.placeholder = placeholder;
    this.tagsInputHelper.innerHTML = placeholder;
    this.calculateInputWidth();
  }
  buildTagsItem(val) {
    var _a, _b, _c, _d;
    const item = this.getItemByValue(val);
    let template, title, remove, icon;
    const newItem = document.createElement("div");
    newItem.setAttribute("data-tag-value", val);
    if (this.tagsItemClasses) classToClassList(this.tagsItemClasses, newItem);
    if (this.tagsItemTemplate) {
      template = htmlToElement(this.tagsItemTemplate);
      newItem.append(template);
    }
    if (((_a = item == null ? void 0 : item.options) == null ? void 0 : _a.icon) || this.apiIconTag) {
      const img = htmlToElement(
        this.apiUrl && this.apiIconTag ? this.apiIconTag : (_b = item == null ? void 0 : item.options) == null ? void 0 : _b.icon
      );
      if (this.apiUrl && this.apiIconTag && item[this.apiFieldsMap.icon])
        img.src = item[this.apiFieldsMap.icon] || "";
      icon = template ? template.querySelector("[data-icon]") : document.createElement("span");
      icon.append(img);
      if (!template) newItem.append(icon);
    }
    if (template && template.querySelector("[data-icon]") && !((_c = item == null ? void 0 : item.options) == null ? void 0 : _c.icon) && !this.apiUrl && !this.apiIconTag && !item[(_d = this.apiFieldsMap) == null ? void 0 : _d.icon]) {
      template.querySelector("[data-icon]").classList.add("hidden");
    }
    title = template ? template.querySelector("[data-title]") : document.createElement("span");
    title.textContent = item.title || "";
    if (!template) newItem.append(title);
    if (template) {
      remove = template.querySelector("[data-remove]");
    } else {
      remove = document.createElement("span");
      remove.textContent = "X";
      newItem.append(remove);
    }
    remove.addEventListener("click", () => {
      this.value = this.value.filter((el) => el !== val);
      this.selectedItems = this.selectedItems.filter((el) => el !== val);
      if (!this.value.length)
        this.reassignTagsInputPlaceholder(this.placeholder);
      this.unselectMultipleItems();
      this.selectMultipleItems();
      newItem.remove();
      this.triggerChangeEventForNativeSelect();
    });
    this.wrapper.append(newItem);
  }
  getItemByValue(val) {
    const value = this.apiUrl ? this.remoteOptions.find(
      (el) => `${el[this.apiFieldsMap.val]}` === val || el[this.apiFieldsMap.title] === val
    ) : this.selectOptions.find((el) => el.val === val);
    return value;
  }
  setTagsItems() {
    if (this.value) {
      this.value.forEach((val) => {
        if (!this.selectedItems.includes(val)) this.buildTagsItem(val);
        this.selectedItems = !this.selectedItems.includes(val) ? [...this.selectedItems, val] : this.selectedItems;
      });
    }
  }
  buildTagsInput() {
    this.tagsInput = document.createElement("input");
    if (this.tagsInputId) this.tagsInput.id = this.tagsInputId;
    if (this.tagsInputClasses)
      classToClassList(this.tagsInputClasses, this.tagsInput);
    this.onTagsInputFocusListener = () => this.tagsInputFocus();
    this.onTagsInputInputListener = () => this.tagsInputInput();
    this.onTagsInputInputSecondListener = debounce(
      (evt) => this.tagsInputInputSecond(evt)
    );
    this.onTagsInputKeydownListener = (evt) => this.tagsInputKeydown(evt);
    this.tagsInput.addEventListener("focus", this.onTagsInputFocusListener);
    this.tagsInput.addEventListener("input", this.onTagsInputInputListener);
    this.tagsInput.addEventListener(
      "input",
      this.onTagsInputInputSecondListener
    );
    this.tagsInput.addEventListener("keydown", this.onTagsInputKeydownListener);
    this.wrapper.append(this.tagsInput);
    setTimeout(() => {
      this.adjustInputWidth();
      this.reassignTagsInputPlaceholder(
        this.value.length ? "" : this.placeholder
      );
    });
  }
  buildDropdown() {
    this.dropdown = htmlToElement(this.dropdownTag || "<div></div>");
    this.dropdown.setAttribute("data-hs-select-dropdown", "");
    if (this.dropdownScope === "parent") {
      this.dropdown.classList.add("absolute");
      if (!this.dropdownVerticalFixedPlacement) this.dropdown.classList.add("top-full");
    }
    this.dropdown.role = "listbox";
    this.dropdown.tabIndex = -1;
    this.dropdown.ariaOrientation = "vertical";
    if (!this.isOpened) this.dropdown.classList.add("hidden");
    if (this.dropdownClasses)
      classToClassList(this.dropdownClasses, this.dropdown);
    if (this.wrapper) this.wrapper.append(this.dropdown);
    if (this.dropdown && this.hasSearch) this.buildSearch();
    if (this.selectOptions)
      this.selectOptions.forEach(
        (props, i) => this.buildOption(
          props.title,
          props.val,
          props.disabled,
          props.selected,
          props.options,
          `${i}`
        )
      );
    if (this.apiUrl) this.optionsFromRemoteData();
    if (this.dropdownScope === "window") this.buildPopper();
  }
  buildPopper() {
    if (typeof Popper !== "undefined" && Popper.createPopper) {
      document.body.appendChild(this.dropdown);
      this.popperInstance = Popper.createPopper(
        this.mode === "tags" ? this.wrapper : this.toggle,
        this.dropdown,
        {
          placement: POSITIONS[this.dropdownPlacement] || "bottom",
          strategy: "fixed",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 5]
              }
            }
          ]
        }
      );
    }
  }
  updateDropdownWidth() {
    const toggle = this.mode === "tags" ? this.wrapper : this.toggle;
    this.dropdown.style.width = `${toggle.clientWidth}px`;
  }
  buildSearch() {
    let input;
    this.searchWrapper = htmlToElement(
      this.searchWrapperTemplate || "<div></div>"
    );
    if (this.searchWrapperClasses)
      classToClassList(this.searchWrapperClasses, this.searchWrapper);
    input = this.searchWrapper.querySelector("[data-input]");
    const search = htmlToElement(
      this.searchTemplate || '<input type="text" />'
    );
    this.search = search.tagName === "INPUT" ? search : search.querySelector(":scope input");
    this.search.placeholder = this.searchPlaceholder;
    if (this.searchClasses) classToClassList(this.searchClasses, this.search);
    if (this.searchId) this.search.id = this.searchId;
    this.onSearchInputListener = debounce((evt) => this.searchInput(evt));
    this.search.addEventListener("input", this.onSearchInputListener);
    if (input) input.append(search);
    else this.searchWrapper.append(search);
    this.dropdown.append(this.searchWrapper);
  }
  buildOption(title, val, disabled = false, selected = false, options, index = "1", id) {
    let template = null;
    let titleWrapper = null;
    let iconWrapper = null;
    let descriptionWrapper = null;
    const option = htmlToElement(this.optionTag || "<div></div>");
    option.setAttribute("data-value", val);
    option.setAttribute("data-title-value", title);
    option.setAttribute("tabIndex", index);
    option.classList.add("cursor-pointer");
    option.setAttribute("data-id", id || `${this.optionId}`);
    if (!id) this.optionId++;
    if (disabled) option.classList.add("disabled");
    if (selected) {
      if (this.isMultiple) this.value = [...this.value, val];
      else this.value = val;
    }
    if (this.optionTemplate) {
      template = htmlToElement(this.optionTemplate);
      option.append(template);
    }
    if (template) {
      titleWrapper = template.querySelector("[data-title]");
      titleWrapper.textContent = title || "";
    } else {
      option.textContent = title || "";
    }
    if (options) {
      if (options.icon) {
        const img = htmlToElement(this.apiIconTag ?? options.icon);
        img.classList.add("max-w-full");
        if (this.apiUrl) {
          img.setAttribute("alt", title);
          img.setAttribute("src", options.icon);
        }
        if (template) {
          iconWrapper = template.querySelector("[data-icon]");
          iconWrapper.append(img);
        } else {
          const icon = htmlToElement("<div></div>");
          if (this.iconClasses) classToClassList(this.iconClasses, icon);
          icon.append(img);
          option.append(icon);
        }
      }
      if (options.description) {
        if (template) {
          descriptionWrapper = template.querySelector("[data-description]");
          if (descriptionWrapper)
            descriptionWrapper.append(options.description);
        } else {
          const description = htmlToElement("<div></div>");
          description.textContent = options.description;
          if (this.descriptionClasses)
            classToClassList(this.descriptionClasses, description);
          option.append(description);
        }
      }
    }
    if (template && template.querySelector("[data-icon]") && !options && !(options == null ? void 0 : options.icon)) {
      template.querySelector("[data-icon]").classList.add("hidden");
    }
    if (this.value && (this.isMultiple ? this.value.includes(val) : this.value === val))
      option.classList.add("selected");
    if (!disabled)
      option.addEventListener("click", () => this.onSelectOption(val));
    if (this.optionClasses) classToClassList(this.optionClasses, option);
    if (this.dropdown) this.dropdown.append(option);
    if (selected) this.setNewValue();
  }
  buildOptionFromRemoteData(title, val, disabled = false, selected = false, index = "1", id, options) {
    if (index) {
      this.buildOption(title, val, disabled, selected, options, index, id);
    } else {
      alert(
        "ID parameter is required for generating remote options! Please check your API endpoint have it."
      );
    }
  }
  buildOptionsFromRemoteData(data) {
    data.forEach((el, i) => {
      let id = null;
      let title = "";
      let value = "";
      const options = {
        id: "",
        val: "",
        title: "",
        icon: null,
        description: null,
        rest: {}
      };
      Object.keys(el).forEach((key) => {
        var _a;
        if (el[this.apiFieldsMap.id]) id = el[this.apiFieldsMap.id];
        if (el[this.apiFieldsMap.val] || el[this.apiFieldsMap.title]) {
          value = el[this.apiFieldsMap.val] || el[this.apiFieldsMap.title];
        }
        if (el[this.apiFieldsMap.title])
          title = el[this.apiFieldsMap.title];
        if (el[this.apiFieldsMap.icon])
          options.icon = el[this.apiFieldsMap.icon];
        if (el[(_a = this.apiFieldsMap) == null ? void 0 : _a.description])
          options.description = el[this.apiFieldsMap.description];
        options.rest[key] = el[key];
      });
      this.buildOriginalOption(
        title,
        `${value}`,
        id,
        false,
        false,
        options
      );
      this.buildOptionFromRemoteData(
        title,
        `${value}`,
        false,
        false,
        `${i}`,
        id,
        options
      );
    });
    this.sortElements(this.el, "option");
    this.sortElements(this.dropdown, "[data-value]");
  }
  async optionsFromRemoteData(val = "") {
    const res = await this.apiRequest(val);
    this.remoteOptions = res;
    if (res.length) this.buildOptionsFromRemoteData(this.remoteOptions);
    else console.log("There is no data were responded!");
  }
  async apiRequest(val = "") {
    try {
      let url = this.apiUrl;
      const search = this.apiSearchQueryKey ? `${this.apiSearchQueryKey}=${val.toLowerCase()}` : null;
      const query = `${this.apiQuery}`;
      const options = this.apiOptions || {};
      if (search) url += `?${search}`;
      if (this.apiQuery) url += `${search ? "&" : "?"}${query}`;
      const req = await fetch(url, options);
      const res = await req.json();
      return this.apiDataPart ? res[this.apiDataPart] : res;
    } catch (err) {
      console.error(err);
    }
  }
  sortElements(container, selector) {
    const items = Array.from(container.querySelectorAll(selector));
    items.sort((a, b) => {
      const isASelected = a.classList.contains("selected") || a.hasAttribute("selected");
      const isBSelected = b.classList.contains("selected") || b.hasAttribute("selected");
      if (isASelected && !isBSelected) return -1;
      if (!isASelected && isBSelected) return 1;
      return 0;
    });
    items.forEach((item) => container.appendChild(item));
  }
  async remoteSearch(val) {
    if (val.length <= this.minSearchLength) {
      const res2 = await this.apiRequest("");
      this.remoteOptions = res2;
      Array.from(this.dropdown.querySelectorAll("[data-value]")).forEach((el) => el.remove());
      Array.from(this.el.querySelectorAll("option[value]")).forEach((el) => {
        el.remove();
      });
      if (res2.length) this.buildOptionsFromRemoteData(res2);
      else console.log("No data responded!");
      return false;
    }
    const res = await this.apiRequest(val);
    this.remoteOptions = res;
    let newIds = res.map((item) => `${item.id}`);
    let restOptions = null;
    const pseudoOptions = this.dropdown.querySelectorAll("[data-value]");
    const options = this.el.querySelectorAll("[data-hs-select-option]");
    options.forEach((el) => {
      var _a;
      const dataId = el.getAttribute("data-id");
      if (!newIds.includes(dataId) && !((_a = this.value) == null ? void 0 : _a.includes(el.value)))
        this.destroyOriginalOption(el.value);
    });
    pseudoOptions.forEach((el) => {
      var _a;
      const dataId = el.getAttribute("data-id");
      if (!newIds.includes(dataId) && !((_a = this.value) == null ? void 0 : _a.includes(el.getAttribute("data-value"))))
        this.destroyOption(el.getAttribute("data-value"));
      else newIds = newIds.filter((item) => item !== dataId);
    });
    restOptions = res.filter(
      (item) => newIds.includes(`${item.id}`)
    );
    if (restOptions.length) this.buildOptionsFromRemoteData(restOptions);
    else console.log("No data responded!");
  }
  destroyOption(val) {
    const option = this.dropdown.querySelector(`[data-value="${val}"]`);
    if (!option) return false;
    option.remove();
  }
  buildOriginalOption(title, val, id, disabled, selected, options) {
    const option = htmlToElement("<option></option>");
    option.setAttribute("value", val);
    if (disabled) option.setAttribute("disabled", "disabled");
    if (selected) option.setAttribute("selected", "selected");
    if (id) option.setAttribute("data-id", id);
    option.setAttribute("data-hs-select-option", JSON.stringify(options));
    option.innerText = title;
    this.el.append(option);
  }
  destroyOriginalOption(val) {
    const option = this.el.querySelector(`[value="${val}"]`);
    if (!option) return false;
    option.remove();
  }
  buildTagsInputHelper() {
    this.tagsInputHelper = document.createElement("span");
    this.tagsInputHelper.style.fontSize = window.getComputedStyle(
      this.tagsInput
    ).fontSize;
    this.tagsInputHelper.style.fontFamily = window.getComputedStyle(
      this.tagsInput
    ).fontFamily;
    this.tagsInputHelper.style.fontWeight = window.getComputedStyle(
      this.tagsInput
    ).fontWeight;
    this.tagsInputHelper.style.letterSpacing = window.getComputedStyle(
      this.tagsInput
    ).letterSpacing;
    this.tagsInputHelper.style.visibility = "hidden";
    this.tagsInputHelper.style.whiteSpace = "pre";
    this.tagsInputHelper.style.position = "absolute";
    this.wrapper.appendChild(this.tagsInputHelper);
  }
  calculateInputWidth() {
    this.tagsInputHelper.textContent = this.tagsInput.value || this.tagsInput.placeholder;
    const inputPadding = parseInt(window.getComputedStyle(this.tagsInput).paddingLeft) + parseInt(window.getComputedStyle(this.tagsInput).paddingRight);
    const inputBorder = parseInt(window.getComputedStyle(this.tagsInput).borderLeftWidth) + parseInt(window.getComputedStyle(this.tagsInput).borderRightWidth);
    const newWidth = this.tagsInputHelper.offsetWidth + inputPadding + inputBorder;
    const maxWidth = this.wrapper.offsetWidth - (parseInt(window.getComputedStyle(this.wrapper).paddingLeft) + parseInt(window.getComputedStyle(this.wrapper).paddingRight));
    this.tagsInput.style.width = `${Math.min(newWidth, maxWidth) + 2}px`;
  }
  adjustInputWidth() {
    this.buildTagsInputHelper();
    this.calculateInputWidth();
  }
  onSelectOption(val) {
    this.clearSelections();
    if (this.isMultiple) {
      this.value = this.value.includes(val) ? Array.from(this.value).filter((el) => el !== val) : [...Array.from(this.value), val];
      this.selectMultipleItems();
      this.setNewValue();
    } else {
      this.value = val;
      this.selectSingleItem();
      this.setNewValue();
    }
    this.fireEvent("change", this.value);
    if (this.mode === "tags") {
      const intersection = this.selectedItems.filter(
        (x) => !this.value.includes(x)
      );
      if (intersection.length) {
        intersection.forEach((el) => {
          this.selectedItems = this.selectedItems.filter((elI) => elI !== el);
          this.wrapper.querySelector(`[data-tag-value="${el}"]`).remove();
        });
      }
      this.resetTagsInputField();
    }
    if (!this.isMultiple) {
      if (this.toggle.querySelector("[data-icon]")) this.setToggleIcon();
      if (this.toggle.querySelector("[data-title]")) this.setToggleTitle();
      this.close(true);
    }
    if (!this.value.length && this.mode === "tags")
      this.reassignTagsInputPlaceholder(this.placeholder);
    if (this.isOpened && this.mode === "tags" && this.tagsInput)
      this.tagsInput.focus();
    this.triggerChangeEventForNativeSelect();
  }
  triggerChangeEventForNativeSelect() {
    const selectChangeEvent = new Event("change", { bubbles: true });
    this.el.dispatchEvent(selectChangeEvent);
    dispatch("change.hs.select", this.el, this.value);
  }
  addSelectOption(title, val, disabled, selected, options) {
    this.selectOptions = [
      ...this.selectOptions,
      {
        title,
        val,
        disabled,
        selected,
        options
      }
    ];
  }
  removeSelectOption(val, isArray = false) {
    const hasOption = !!this.selectOptions.some(
      (el) => el.val === val
    );
    if (!hasOption) return false;
    this.selectOptions = this.selectOptions.filter(
      (el) => el.val !== val
    );
    this.value = isArray ? this.value.filter((item) => item !== val) : val;
  }
  resetTagsInputField() {
    this.tagsInput.value = "";
    this.reassignTagsInputPlaceholder("");
    this.searchOptions("");
  }
  clearSelections() {
    Array.from(this.dropdown.children).forEach((el) => {
      if (el.classList.contains("selected")) el.classList.remove("selected");
    });
    Array.from(this.el.children).forEach((el) => {
      if (el.selected)
        el.selected = false;
    });
  }
  setNewValue() {
    var _a;
    if (this.mode === "tags") {
      this.setTagsItems();
    } else {
      if ((_a = this.value) == null ? void 0 : _a.length) {
        this.toggleTextWrapper.innerHTML = this.stringFromValue();
      } else {
        this.toggleTextWrapper.innerHTML = this.placeholder;
      }
    }
  }
  stringFromValueBasic(options) {
    var _a;
    const value = [];
    let title = "";
    options.forEach((el) => {
      if (this.isMultiple) {
        if (this.value.includes(el.val)) value.push(el.title);
      } else {
        if (this.value === el.val) value.push(el.title);
      }
    });
    if (this.toggleCountText !== void 0 && this.toggleCountText !== null && value.length >= this.toggleCountTextMinItems) {
      if (this.toggleCountTextMode === "nItemsAndCount") {
        const nItems = value.slice(0, this.toggleCountTextMinItems - 1);
        const tempTitle = [nItems.join(this.toggleSeparators.items)];
        const count = `${value.length - nItems.length}`;
        if ((_a = this == null ? void 0 : this.toggleSeparators) == null ? void 0 : _a.betweenItemsAndCounter)
          tempTitle.push(this.toggleSeparators.betweenItemsAndCounter);
        if (this.toggleCountText) {
          switch (this.toggleCountTextPlacement) {
            case "postfix-no-space":
              tempTitle.push(`${count}${this.toggleCountText}`);
              break;
            case "prefix-no-space":
              tempTitle.push(`${this.toggleCountText}${count}`);
              break;
            case "prefix":
              tempTitle.push(`${this.toggleCountText} ${count}`);
              break;
            default:
              tempTitle.push(`${count} ${this.toggleCountText}`);
              break;
          }
        }
        title = tempTitle.join(" ");
      } else {
        title = `${value.length} ${this.toggleCountText}`;
      }
    } else {
      title = value.join(this.toggleSeparators.items);
    }
    return title;
  }
  stringFromValueRemoteData() {
    const options = this.dropdown.querySelectorAll("[data-title-value]");
    const value = [];
    let title = "";
    options.forEach((el) => {
      const dataValue = el.getAttribute("data-value");
      const dataTitleValue = el.getAttribute("data-title-value");
      if (this.isMultiple) {
        if (this.value.includes(dataValue)) value.push(dataTitleValue);
      } else {
        if (this.value === dataValue) value.push(dataTitleValue);
      }
    });
    if (this.toggleCountText && this.toggleCountText !== "" && value.length >= this.toggleCountTextMinItems) {
      if (this.toggleCountTextMode === "nItemsAndCount") {
        const nItems = value.slice(0, this.toggleCountTextMinItems - 1);
        title = `${nItems.join(this.toggleSeparators.items)} ${this.toggleSeparators.betweenItemsAndCounter} ${value.length - nItems.length} ${this.toggleCountText}`;
      } else {
        title = `${value.length} ${this.toggleCountText}`;
      }
    } else {
      title = value.join(this.toggleSeparators.items);
    }
    return title;
  }
  stringFromValue() {
    const result = this.apiUrl ? this.stringFromValueRemoteData() : this.stringFromValueBasic(this.selectOptions);
    return result;
  }
  selectSingleItem() {
    const selectedOption = Array.from(this.el.children).find(
      (el) => this.value === el.value
    );
    selectedOption.selected = true;
    const selectedItem = Array.from(this.dropdown.children).find(
      (el) => this.value === el.getAttribute("data-value")
    );
    if (selectedItem) selectedItem.classList.add("selected");
  }
  selectMultipleItems() {
    Array.from(this.dropdown.children).filter((el) => this.value.includes(el.getAttribute("data-value"))).forEach((el) => el.classList.add("selected"));
    Array.from(this.el.children).filter((el) => this.value.includes(el.value)).forEach((el) => el.selected = true);
  }
  unselectMultipleItems() {
    Array.from(this.dropdown.children).forEach(
      (el) => el.classList.remove("selected")
    );
    Array.from(this.el.children).forEach(
      (el) => el.selected = false
    );
  }
  searchOptions(val) {
    if (val.length <= this.minSearchLength) {
      if (this.searchNoResult) {
        this.searchNoResult.remove();
        this.searchNoResult = null;
      }
      const options2 = this.dropdown.querySelectorAll("[data-value]");
      options2.forEach((el) => {
        el.classList.remove("hidden");
      });
      return false;
    }
    if (this.searchNoResult) {
      this.searchNoResult.remove();
      this.searchNoResult = null;
    }
    this.searchNoResult = htmlToElement(this.searchNoResultTemplate);
    this.searchNoResult.innerText = this.searchNoResultText;
    classToClassList(this.searchNoResultClasses, this.searchNoResult);
    const options = this.dropdown.querySelectorAll("[data-value]");
    let hasItems = false;
    let countLimit;
    if (this.searchLimit) countLimit = 0;
    options.forEach((el) => {
      const optionVal = el.getAttribute("data-title-value").toLocaleLowerCase();
      const directMatch = this.isSearchDirectMatch;
      let condition;
      if (directMatch) {
        condition = !optionVal.includes(val.toLowerCase()) || this.searchLimit && countLimit >= this.searchLimit;
      } else {
        const regexSafeVal = val ? val.split("").map((char) => /\w/.test(char) ? `${char}[\\W_]*` : "\\W*").join("") : "";
        const regex = new RegExp(regexSafeVal, "i");
        condition = !regex.test(optionVal.trim()) || this.searchLimit && countLimit >= this.searchLimit;
      }
      if (condition) {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
        hasItems = true;
        if (this.searchLimit) countLimit++;
      }
    });
    if (!hasItems) this.dropdown.append(this.searchNoResult);
  }
  eraseToggleIcon() {
    const icon = this.toggle.querySelector("[data-icon]");
    if (icon) {
      icon.innerHTML = null;
      icon.classList.add("hidden");
    }
  }
  eraseToggleTitle() {
    const title = this.toggle.querySelector("[data-title]");
    if (title) {
      title.innerHTML = this.placeholder;
    } else {
      this.toggleTextWrapper.innerHTML = this.placeholder;
    }
  }
  toggleFn() {
    if (this.isOpened) this.close();
    else this.open();
  }
  // Public methods
  destroy() {
    if (this.wrapper)
      this.wrapper.removeEventListener("click", this.onWrapperClickListener);
    if (this.toggle)
      this.toggle.removeEventListener("click", this.onToggleClickListener);
    if (this.tagsInput) {
      this.tagsInput.removeEventListener(
        "focus",
        this.onTagsInputFocusListener
      );
      this.tagsInput.removeEventListener(
        "input",
        this.onTagsInputInputListener
      );
      this.tagsInput.removeEventListener(
        "input",
        this.onTagsInputInputSecondListener
      );
      this.tagsInput.removeEventListener(
        "keydown",
        this.onTagsInputKeydownListener
      );
    }
    if (this.search)
      this.search.removeEventListener("input", this.onSearchInputListener);
    const parent = this.el.parentElement.parentElement;
    this.el.classList.remove("hidden");
    this.el.style.display = "";
    parent.prepend(this.el);
    parent.querySelector(".hs-select").remove();
    this.wrapper = null;
  }
  open() {
    var _a;
    const currentlyOpened = ((_a = window == null ? void 0 : window.$hsSelectCollection) == null ? void 0 : _a.find((el) => el.element.isOpened)) || null;
    if (currentlyOpened) currentlyOpened.element.close();
    if (this.animationInProcess) return false;
    this.animationInProcess = true;
    if (this.dropdownScope === "window")
      this.dropdown.classList.add("invisible");
    this.dropdown.classList.remove("hidden");
    this.recalculateDirection();
    setTimeout(() => {
      var _a2;
      if ((_a2 = this == null ? void 0 : this.toggle) == null ? void 0 : _a2.ariaExpanded) this.toggle.ariaExpanded = "true";
      this.wrapper.classList.add("active");
      this.dropdown.classList.add("opened");
      if (this.dropdown.classList.contains("w-full") && this.dropdownScope === "window")
        this.updateDropdownWidth();
      if (this.popperInstance && this.dropdownScope === "window") {
        this.popperInstance.update();
        this.dropdown.classList.remove("invisible");
      }
      if (this.hasSearch && !this.preventSearchFocus) this.search.focus();
      this.animationInProcess = false;
    });
    this.isOpened = true;
  }
  close(forceFocus = false) {
    var _a, _b, _c, _d;
    if (this.animationInProcess) return false;
    this.animationInProcess = true;
    if ((_a = this == null ? void 0 : this.toggle) == null ? void 0 : _a.ariaExpanded) this.toggle.ariaExpanded = "false";
    this.wrapper.classList.remove("active");
    this.dropdown.classList.remove("opened", "bottom-full", "top-full");
    if ((_b = this.dropdownDirectionClasses) == null ? void 0 : _b.bottom)
      this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom);
    if ((_c = this.dropdownDirectionClasses) == null ? void 0 : _c.top)
      this.dropdown.classList.remove(this.dropdownDirectionClasses.top);
    this.dropdown.style.marginTop = "";
    this.dropdown.style.marginBottom = "";
    afterTransition(this.dropdown, () => {
      this.dropdown.classList.add("hidden");
      if (this.hasSearch) {
        this.search.value = "";
        this.search.dispatchEvent(new Event("input", { bubbles: true }));
        this.search.blur();
      }
      if (forceFocus) this.toggle.focus();
      this.animationInProcess = false;
    });
    (_d = this.dropdown.querySelector(".hs-select-option-highlighted")) == null ? void 0 : _d.classList.remove("hs-select-option-highlighted");
    this.isOpened = false;
  }
  addOption(items) {
    let i = `${this.selectOptions.length}`;
    const addOption = (option) => {
      const { title, val, disabled, selected, options } = option;
      const hasOption = !!this.selectOptions.some(
        (el) => el.val === val
      );
      if (!hasOption) {
        this.addSelectOption(title, val, disabled, selected, options);
        this.buildOption(title, val, disabled, selected, options, i);
        this.buildOriginalOption(title, val, null, disabled, selected, options);
        if (selected && !this.isMultiple) this.onSelectOption(val);
      }
    };
    if (Array.isArray(items)) {
      items.forEach((option) => {
        addOption(option);
      });
    } else {
      addOption(items);
    }
  }
  removeOption(values) {
    const removeOption = (val, isArray = false) => {
      const hasOption = !!this.selectOptions.some(
        (el) => el.val === val
      );
      if (hasOption) {
        this.removeSelectOption(val, isArray);
        this.destroyOption(val);
        this.destroyOriginalOption(val);
        if (this.value === val) {
          this.value = null;
          this.eraseToggleTitle();
          this.eraseToggleIcon();
        }
      }
    };
    if (Array.isArray(values)) {
      values.forEach((val) => {
        removeOption(val, this.isMultiple);
      });
    } else {
      removeOption(values, this.isMultiple);
    }
    this.setNewValue();
  }
  recalculateDirection() {
    var _a, _b, _c, _d;
    if ((this == null ? void 0 : this.dropdownVerticalFixedPlacement) && (this.dropdown.classList.contains("bottom-full") || this.dropdown.classList.contains("top-full"))) return false;
    if ((this == null ? void 0 : this.dropdownVerticalFixedPlacement) === "top") {
      this.dropdown.classList.add("bottom-full");
      this.dropdown.style.marginBottom = `${this.dropdownSpace}px`;
    } else if ((this == null ? void 0 : this.dropdownVerticalFixedPlacement) === "bottom") {
      this.dropdown.classList.add("top-full");
      this.dropdown.style.marginTop = `${this.dropdownSpace}px`;
    } else if (isEnoughSpace(
      this.dropdown,
      this.toggle || this.tagsInput,
      "bottom",
      this.dropdownSpace,
      this.viewport
    )) {
      this.dropdown.classList.remove("bottom-full");
      if ((_a = this.dropdownDirectionClasses) == null ? void 0 : _a.bottom)
        this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom);
      this.dropdown.style.marginBottom = "";
      this.dropdown.classList.add("top-full");
      if ((_b = this.dropdownDirectionClasses) == null ? void 0 : _b.top)
        this.dropdown.classList.add(this.dropdownDirectionClasses.top);
      this.dropdown.style.marginTop = `${this.dropdownSpace}px`;
    } else {
      this.dropdown.classList.remove("top-full");
      if ((_c = this.dropdownDirectionClasses) == null ? void 0 : _c.top)
        this.dropdown.classList.remove(this.dropdownDirectionClasses.top);
      this.dropdown.style.marginTop = "";
      this.dropdown.classList.add("bottom-full");
      if ((_d = this.dropdownDirectionClasses) == null ? void 0 : _d.bottom)
        this.dropdown.classList.add(this.dropdownDirectionClasses.bottom);
      this.dropdown.style.marginBottom = `${this.dropdownSpace}px`;
    }
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsSelectCollection.find((el) => {
      if (target instanceof _HSSelect) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsSelectCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsSelectCollection) {
      window.$hsSelectCollection = [];
      window.addEventListener("click", (evt) => {
        const evtTarget = evt.target;
        _HSSelect.closeCurrentlyOpened(evtTarget);
      });
      document.addEventListener(
        "keydown",
        (evt) => _HSSelect.accessibility(evt)
      );
    }
    if (window.$hsSelectCollection)
      window.$hsSelectCollection = window.$hsSelectCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-select]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsSelectCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      )) {
        const data = el.getAttribute("data-hs-select");
        const options = data ? JSON.parse(data) : {};
        new _HSSelect(el, options);
      }
    });
  }
  static open(target) {
    const instance = _HSSelect.findInCollection(target);
    if (instance && !instance.element.isOpened) instance.element.open();
  }
  static close(target) {
    const instance = _HSSelect.findInCollection(target);
    if (instance && instance.element.isOpened) instance.element.close();
  }
  static closeCurrentlyOpened(evtTarget = null) {
    if (!evtTarget.closest(".hs-select.active") && !evtTarget.closest("[data-hs-select-dropdown].opened")) {
      const currentlyOpened = window.$hsSelectCollection.filter((el) => el.element.isOpened) || null;
      if (currentlyOpened) currentlyOpened.forEach((el) => {
        el.element.close();
      });
    }
  }
  // Accessibility methods
  static accessibility(evt) {
    const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
    if (target && SELECT_ACCESSIBILITY_KEY_SET.includes(evt.code) && !evt.metaKey) {
      switch (evt.code) {
        case "Escape":
          evt.preventDefault();
          this.onEscape();
          break;
        case "ArrowUp":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow();
          break;
        case "ArrowDown":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onArrow(false);
          break;
        case "Tab":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onTab(evt.shiftKey);
          break;
        case "Home":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd();
          break;
        case "End":
          evt.preventDefault();
          evt.stopImmediatePropagation();
          this.onStartEnd(false);
          break;
        case "Enter":
          evt.preventDefault();
          this.onEnter(evt);
          break;
        case "Space":
          evt.preventDefault();
          this.onEnter(evt);
          break;
        default:
          break;
      }
    }
  }
  static onEscape() {
    const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
    if (target) target.element.close();
  }
  static onArrow(isArrowUp = true) {
    const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
    if (target) {
      const dropdown = target.element.dropdown;
      if (!dropdown) return false;
      const preparedOptions = isArrowUp ? Array.from(
        dropdown.querySelectorAll(":scope > *:not(.hidden)")
      ).reverse() : Array.from(dropdown.querySelectorAll(":scope > *:not(.hidden)"));
      const options = preparedOptions.filter(
        (el) => !el.classList.contains("disabled")
      );
      const current = dropdown.querySelector(".hs-select-option-highlighted") || dropdown.querySelector(".selected");
      if (!current) options[0].classList.add("hs-select-option-highlighted");
      let currentInd = options.findIndex((el) => el === current);
      if (currentInd + 1 < options.length) {
        currentInd++;
      }
      options[currentInd].focus();
      if (current) current.classList.remove("hs-select-option-highlighted");
      options[currentInd].classList.add("hs-select-option-highlighted");
    }
  }
  static onTab(isArrowUp = true) {
    const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
    if (target) {
      const dropdown = target.element.dropdown;
      if (!dropdown) return false;
      const preparedOptions = isArrowUp ? Array.from(
        dropdown.querySelectorAll(":scope >  *:not(.hidden)")
      ).reverse() : Array.from(dropdown.querySelectorAll(":scope >  *:not(.hidden)"));
      const options = preparedOptions.filter(
        (el) => !el.classList.contains("disabled")
      );
      const current = dropdown.querySelector(".hs-select-option-highlighted") || dropdown.querySelector(".selected");
      if (!current) options[0].classList.add("hs-select-option-highlighted");
      let currentInd = options.findIndex((el) => el === current);
      if (currentInd + 1 < options.length) {
        currentInd++;
      } else {
        if (current) current.classList.remove("hs-select-option-highlighted");
        target.element.close();
        target.element.toggle.focus();
        return false;
      }
      options[currentInd].focus();
      if (current) current.classList.remove("hs-select-option-highlighted");
      options[currentInd].classList.add("hs-select-option-highlighted");
    }
  }
  static onStartEnd(isStart = true) {
    const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
    if (target) {
      const dropdown = target.element.dropdown;
      if (!dropdown) return false;
      const preparedOptions = isStart ? Array.from(dropdown.querySelectorAll(":scope >  *:not(.hidden)")) : Array.from(
        dropdown.querySelectorAll(":scope >  *:not(.hidden)")
      ).reverse();
      const options = preparedOptions.filter(
        (el) => !el.classList.contains("disabled")
      );
      const current = dropdown.querySelector(".hs-select-option-highlighted");
      if (options.length) {
        options[0].focus();
        if (current) current.classList.remove("hs-select-option-highlighted");
        options[0].classList.add("hs-select-option-highlighted");
      }
    }
  }
  static onEnter(evt) {
    const select = evt.target.previousSibling;
    if (window.$hsSelectCollection.find((el) => el.element.el === select)) {
      const opened = window.$hsSelectCollection.find(
        (el) => el.element.isOpened
      );
      const target = window.$hsSelectCollection.find(
        (el) => el.element.el === select
      );
      opened.element.close();
      target.element.open();
    } else {
      const target = window.$hsSelectCollection.find(
        (el) => el.element.isOpened
      );
      if (target)
        target.element.onSelectOption(
          evt.target.dataset.value || ""
        );
    }
  }
};
window.addEventListener("load", () => {
  HSSelect.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsSelectCollection) return false;
  const target = window.$hsSelectCollection.find((el) => el.element.isOpened);
  if (target) target.element.recalculateDirection();
});
if (typeof window !== "undefined") {
  window.HSSelect = HSSelect;
}
var select_default = HSSelect;

// node_modules/preline/src/plugins/stepper/index.ts
init_utils();
init_base_plugin();
var HSStepper = class _HSStepper extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "currentIndex");
    __publicField(this, "mode");
    __publicField(this, "isCompleted");
    __publicField(this, "totalSteps");
    __publicField(this, "navItems");
    __publicField(this, "contentItems");
    __publicField(this, "backBtn");
    __publicField(this, "nextBtn");
    __publicField(this, "skipBtn");
    __publicField(this, "completeStepBtn");
    __publicField(this, "completeStepBtnDefaultText");
    __publicField(this, "finishBtn");
    __publicField(this, "resetBtn");
    __publicField(this, "onNavItemClickListener");
    __publicField(this, "onBackClickListener");
    __publicField(this, "onNextClickListener");
    __publicField(this, "onSkipClickListener");
    __publicField(this, "onCompleteStepBtnClickListener");
    __publicField(this, "onFinishBtnClickListener");
    __publicField(this, "onResetBtnClickListener");
    const data = el.getAttribute("data-hs-stepper");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.currentIndex = (concatOptions == null ? void 0 : concatOptions.currentIndex) || 1;
    this.mode = (concatOptions == null ? void 0 : concatOptions.mode) || "linear";
    this.isCompleted = typeof (concatOptions == null ? void 0 : concatOptions.isCompleted) !== "undefined" ? concatOptions == null ? void 0 : concatOptions.isCompleted : false;
    this.totalSteps = 1;
    this.navItems = [];
    this.contentItems = [];
    this.onNavItemClickListener = [];
    this.init();
  }
  navItemClick(item) {
    this.handleNavItemClick(item);
  }
  backClick() {
    this.handleBackButtonClick();
    if (this.mode === "linear") {
      const currentNavItem = this.navItems.find(
        ({ index }) => index === this.currentIndex
      );
      const currentContentItem = this.contentItems.find(
        ({ index }) => index === this.currentIndex
      );
      if (!currentNavItem || !currentContentItem) return;
      if (currentNavItem.isCompleted) {
        currentNavItem.isCompleted = false;
        currentNavItem.isSkip = false;
        currentNavItem.el.classList.remove("success", "skipped");
      }
      if (currentContentItem.isCompleted) {
        currentContentItem.isCompleted = false;
        currentContentItem.isSkip = false;
        currentContentItem.el.classList.remove("success", "skipped");
      }
      if (this.mode === "linear" && this.currentIndex !== this.totalSteps) {
        if (this.nextBtn) this.nextBtn.style.display = "";
        if (this.completeStepBtn) this.completeStepBtn.style.display = "";
      }
      this.showSkipButton();
      this.showFinishButton();
      this.showCompleteStepButton();
    }
  }
  nextClick() {
    var _a;
    this.fireEvent("beforeNext", this.currentIndex);
    dispatch("beforeNext.hs.stepper", this.el, this.currentIndex);
    if ((_a = this.getNavItem(this.currentIndex)) == null ? void 0 : _a.isProcessed) {
      this.disableAll();
      return false;
    }
    this.goToNext();
  }
  skipClick() {
    this.handleSkipButtonClick();
    if (this.mode === "linear" && this.currentIndex === this.totalSteps) {
      if (this.nextBtn) this.nextBtn.style.display = "none";
      if (this.completeStepBtn) this.completeStepBtn.style.display = "none";
      if (this.finishBtn) this.finishBtn.style.display = "";
    }
  }
  completeStepBtnClick() {
    this.handleCompleteStepButtonClick();
  }
  finishBtnClick() {
    this.handleFinishButtonClick();
  }
  resetBtnClick() {
    this.handleResetButtonClick();
  }
  init() {
    this.createCollection(window.$hsStepperCollection, this);
    this.buildNav();
    this.buildContent();
    this.buildButtons();
    this.setTotalSteps();
  }
  getUncompletedSteps(inIncludedSkipped = false) {
    return this.navItems.filter(
      ({ isCompleted, isSkip }) => inIncludedSkipped ? !isCompleted || isSkip : !isCompleted && !isSkip
    );
  }
  setTotalSteps() {
    this.navItems.forEach((item) => {
      const { index } = item;
      if (index > this.totalSteps) this.totalSteps = index;
    });
  }
  // Nav
  buildNav() {
    this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((el) => this.addNavItem(el));
    this.navItems.forEach((item) => this.buildNavItem(item));
  }
  buildNavItem(item) {
    const { index, isDisabled, el } = item;
    if (index === this.currentIndex) this.setCurrentNavItem();
    if (this.mode !== "linear" || isDisabled) {
      this.onNavItemClickListener.push({
        el,
        fn: () => this.navItemClick(item)
      });
      el.addEventListener(
        "click",
        this.onNavItemClickListener.find((navItem) => navItem.el === el).fn
      );
    }
  }
  addNavItem(el) {
    const {
      index,
      isFinal = false,
      isCompleted = false,
      isSkip = false,
      isOptional = false,
      isDisabled = false,
      isProcessed = false,
      hasError = false
    } = JSON.parse(el.getAttribute("data-hs-stepper-nav-item"));
    if (isCompleted) el.classList.add("success");
    if (isSkip) el.classList.add("skipped");
    if (isDisabled) {
      if (el.tagName === "BUTTON" || el.tagName === "INPUT")
        el.setAttribute("disabled", "disabled");
      el.classList.add("disabled");
    }
    if (hasError) el.classList.add("error");
    this.navItems.push({
      index,
      isFinal,
      isCompleted,
      isSkip,
      isOptional,
      isDisabled,
      isProcessed,
      hasError,
      el
    });
  }
  setCurrentNavItem() {
    this.navItems.forEach((item) => {
      const { index, el } = item;
      if (index === this.currentIndex) this.setCurrentNavItemActions(el);
      else this.unsetCurrentNavItemActions(el);
    });
  }
  setCurrentNavItemActions(el) {
    el.classList.add("active");
    this.fireEvent("active", this.currentIndex);
    dispatch("active.hs.stepper", this.el, this.currentIndex);
  }
  getNavItem(n = this.currentIndex) {
    return this.navItems.find(({ index }) => index === n);
  }
  setProcessedNavItemActions(item) {
    item.isProcessed = true;
    item.el.classList.add("processed");
  }
  setErrorNavItemActions(item) {
    item.hasError = true;
    item.el.classList.add("error");
  }
  unsetCurrentNavItemActions(el) {
    el.classList.remove("active");
  }
  handleNavItemClick(item) {
    const { index } = item;
    this.currentIndex = index;
    this.setCurrentNavItem();
    this.setCurrentContentItem();
    this.checkForTheFirstStep();
  }
  // Content
  buildContent() {
    this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((el) => this.addContentItem(el));
    this.navItems.forEach((item) => this.buildContentItem(item));
  }
  buildContentItem(item) {
    const { index } = item;
    if (index === this.currentIndex) this.setCurrentContentItem();
  }
  addContentItem(el) {
    const {
      index,
      isFinal = false,
      isCompleted = false,
      isSkip = false
    } = JSON.parse(el.getAttribute("data-hs-stepper-content-item"));
    if (isCompleted) el.classList.add("success");
    if (isSkip) el.classList.add("skipped");
    this.contentItems.push({
      index,
      isFinal,
      isCompleted,
      isSkip,
      el
    });
  }
  setCurrentContentItem() {
    if (this.isCompleted) {
      const finalContentItem = this.contentItems.find(({ isFinal }) => isFinal);
      const otherContentItems = this.contentItems.filter(
        ({ isFinal }) => !isFinal
      );
      finalContentItem.el.style.display = "";
      otherContentItems.forEach(({ el }) => el.style.display = "none");
      return false;
    }
    this.contentItems.forEach((item) => {
      const { index, el } = item;
      if (index === this.currentIndex) this.setCurrentContentItemActions(el);
      else this.unsetCurrentContentItemActions(el);
    });
  }
  hideAllContentItems() {
    this.contentItems.forEach(({ el }) => el.style.display = "none");
  }
  setCurrentContentItemActions(el) {
    el.style.display = "";
  }
  unsetCurrentContentItemActions(el) {
    el.style.display = "none";
  }
  disableAll() {
    const currentNavItem = this.getNavItem(this.currentIndex);
    currentNavItem.hasError = false;
    currentNavItem.isCompleted = false;
    currentNavItem.isDisabled = false;
    currentNavItem.el.classList.remove("error", "success");
    this.disableButtons();
  }
  disableNavItemActions(item) {
    item.isDisabled = true;
    item.el.classList.add("disabled");
  }
  enableNavItemActions(item) {
    item.isDisabled = false;
    item.el.classList.remove("disabled");
  }
  // Buttons
  buildButtons() {
    this.backBtn = this.el.querySelector("[data-hs-stepper-back-btn]");
    this.nextBtn = this.el.querySelector("[data-hs-stepper-next-btn]");
    this.skipBtn = this.el.querySelector("[data-hs-stepper-skip-btn]");
    this.completeStepBtn = this.el.querySelector(
      "[data-hs-stepper-complete-step-btn]"
    );
    this.finishBtn = this.el.querySelector("[data-hs-stepper-finish-btn]");
    this.resetBtn = this.el.querySelector("[data-hs-stepper-reset-btn]");
    this.buildBackButton();
    this.buildNextButton();
    this.buildSkipButton();
    this.buildCompleteStepButton();
    this.buildFinishButton();
    this.buildResetButton();
  }
  // back
  buildBackButton() {
    if (!this.backBtn) return;
    this.checkForTheFirstStep();
    this.onBackClickListener = () => this.backClick();
    this.backBtn.addEventListener("click", this.onBackClickListener);
  }
  handleBackButtonClick() {
    if (this.currentIndex === 1) return;
    if (this.mode === "linear") {
      this.removeOptionalClasses();
    }
    this.currentIndex--;
    if (this.mode === "linear") {
      this.removeOptionalClasses();
    }
    this.setCurrentNavItem();
    this.setCurrentContentItem();
    this.checkForTheFirstStep();
    if (this.completeStepBtn)
      this.changeTextAndDisableCompleteButtonIfStepCompleted();
    this.fireEvent("back", this.currentIndex);
    dispatch("back.hs.stepper", this.el, this.currentIndex);
  }
  checkForTheFirstStep() {
    if (this.currentIndex === 1) {
      this.setToDisabled(this.backBtn);
    } else {
      this.setToNonDisabled(this.backBtn);
    }
  }
  setToDisabled(el) {
    if (el.tagName === "BUTTON" || el.tagName === "INPUT")
      el.setAttribute("disabled", "disabled");
    el.classList.add("disabled");
  }
  setToNonDisabled(el) {
    if (el.tagName === "BUTTON" || el.tagName === "INPUT")
      el.removeAttribute("disabled");
    el.classList.remove("disabled");
  }
  // next
  buildNextButton() {
    if (!this.nextBtn) return;
    this.onNextClickListener = () => this.nextClick();
    this.nextBtn.addEventListener("click", this.onNextClickListener);
  }
  unsetProcessedNavItemActions(item) {
    item.isProcessed = false;
    item.el.classList.remove("processed");
  }
  handleNextButtonClick(infinite = true) {
    if (infinite) {
      if (this.currentIndex === this.totalSteps) this.currentIndex = 1;
      else this.currentIndex++;
    } else {
      const nonCompletedSteps = this.getUncompletedSteps();
      if (nonCompletedSteps.length === 1) {
        const { index } = nonCompletedSteps[0];
        this.currentIndex = index;
      } else {
        if (this.currentIndex === this.totalSteps) return;
        this.currentIndex++;
      }
    }
    if (this.mode === "linear") {
      this.removeOptionalClasses();
    }
    this.setCurrentNavItem();
    this.setCurrentContentItem();
    this.checkForTheFirstStep();
    if (this.completeStepBtn)
      this.changeTextAndDisableCompleteButtonIfStepCompleted();
    this.showSkipButton();
    this.showFinishButton();
    this.showCompleteStepButton();
    this.fireEvent("next", this.currentIndex);
    dispatch("next.hs.stepper", this.el, this.currentIndex);
  }
  removeOptionalClasses() {
    const currentNavItem = this.navItems.find(
      ({ index }) => index === this.currentIndex
    );
    const currentContentItem = this.contentItems.find(
      ({ index }) => index === this.currentIndex
    );
    currentNavItem.isSkip = false;
    currentNavItem.hasError = false;
    currentNavItem.isDisabled = false;
    currentContentItem.isSkip = false;
    currentNavItem.el.classList.remove("skipped", "success", "error");
    currentContentItem.el.classList.remove("skipped", "success", "error");
  }
  // skip
  buildSkipButton() {
    if (!this.skipBtn) return;
    this.showSkipButton();
    this.onSkipClickListener = () => this.skipClick();
    this.skipBtn.addEventListener("click", this.onSkipClickListener);
  }
  setSkipItem(n) {
    const targetNavItem = this.navItems.find(
      ({ index }) => index === (n || this.currentIndex)
    );
    const targetContentItem = this.contentItems.find(
      ({ index }) => index === (n || this.currentIndex)
    );
    if (!targetNavItem || !targetContentItem) return;
    this.setSkipItemActions(targetNavItem);
    this.setSkipItemActions(targetContentItem);
  }
  setSkipItemActions(item) {
    item.isSkip = true;
    item.el.classList.add("skipped");
  }
  showSkipButton() {
    if (!this.skipBtn) return;
    const { isOptional } = this.navItems.find(
      ({ index }) => index === this.currentIndex
    );
    if (isOptional) this.skipBtn.style.display = "";
    else this.skipBtn.style.display = "none";
  }
  handleSkipButtonClick() {
    this.setSkipItem();
    this.handleNextButtonClick();
    this.fireEvent("skip", this.currentIndex);
    dispatch("skip.hs.stepper", this.el, this.currentIndex);
  }
  // complete
  buildCompleteStepButton() {
    if (!this.completeStepBtn) return;
    this.completeStepBtnDefaultText = this.completeStepBtn.innerText;
    this.onCompleteStepBtnClickListener = () => this.completeStepBtnClick();
    this.completeStepBtn.addEventListener(
      "click",
      this.onCompleteStepBtnClickListener
    );
  }
  changeTextAndDisableCompleteButtonIfStepCompleted() {
    const currentNavItem = this.navItems.find(
      ({ index }) => index === this.currentIndex
    );
    const { completedText } = JSON.parse(
      this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn")
    );
    if (!currentNavItem) return;
    if (currentNavItem.isCompleted) {
      this.completeStepBtn.innerText = completedText || this.completeStepBtnDefaultText;
      this.completeStepBtn.setAttribute("disabled", "disabled");
      this.completeStepBtn.classList.add("disabled");
    } else {
      this.completeStepBtn.innerText = this.completeStepBtnDefaultText;
      this.completeStepBtn.removeAttribute("disabled");
      this.completeStepBtn.classList.remove("disabled");
    }
  }
  setCompleteItem(n) {
    const targetNavItem = this.navItems.find(
      ({ index }) => index === (n || this.currentIndex)
    );
    const targetContentItem = this.contentItems.find(
      ({ index }) => index === (n || this.currentIndex)
    );
    if (!targetNavItem || !targetContentItem) return;
    this.setCompleteItemActions(targetNavItem);
    this.setCompleteItemActions(targetContentItem);
  }
  setCompleteItemActions(item) {
    item.isCompleted = true;
    item.el.classList.add("success");
  }
  showCompleteStepButton() {
    if (!this.completeStepBtn) return;
    const nonCompletedSteps = this.getUncompletedSteps();
    if (nonCompletedSteps.length === 1)
      this.completeStepBtn.style.display = "none";
    else this.completeStepBtn.style.display = "";
  }
  handleCompleteStepButtonClick() {
    this.setCompleteItem();
    this.fireEvent("complete", this.currentIndex);
    dispatch("complete.hs.stepper", this.el, this.currentIndex);
    this.handleNextButtonClick(false);
    this.showFinishButton();
    this.showCompleteStepButton();
    this.checkForTheFirstStep();
    if (this.completeStepBtn)
      this.changeTextAndDisableCompleteButtonIfStepCompleted();
    this.showSkipButton();
  }
  // finish
  buildFinishButton() {
    if (!this.finishBtn) return;
    if (this.isCompleted) {
      this.setCompleted();
    }
    this.onFinishBtnClickListener = () => this.finishBtnClick();
    this.finishBtn.addEventListener("click", this.onFinishBtnClickListener);
  }
  setCompleted() {
    this.el.classList.add("completed");
  }
  unsetCompleted() {
    this.el.classList.remove("completed");
  }
  showFinishButton() {
    if (!this.finishBtn) return;
    const nonCompletedSteps = this.getUncompletedSteps();
    if (nonCompletedSteps.length === 1) this.finishBtn.style.display = "";
    else this.finishBtn.style.display = "none";
  }
  handleFinishButtonClick() {
    const uncompletedSteps = this.getUncompletedSteps();
    const uncompletedOrSkipSteps = this.getUncompletedSteps(true);
    const { el } = this.contentItems.find(({ isFinal }) => isFinal);
    if (uncompletedSteps.length)
      uncompletedSteps.forEach(({ index }) => this.setCompleteItem(index));
    this.currentIndex = this.totalSteps;
    this.setCurrentNavItem();
    this.hideAllContentItems();
    const currentNavItem = this.navItems.find(
      ({ index }) => index === this.currentIndex
    );
    const currentNavItemEl = currentNavItem ? currentNavItem.el : null;
    currentNavItemEl.classList.remove("active");
    el.style.display = "block";
    if (this.backBtn) this.backBtn.style.display = "none";
    if (this.nextBtn) this.nextBtn.style.display = "none";
    if (this.skipBtn) this.skipBtn.style.display = "none";
    if (this.completeStepBtn) this.completeStepBtn.style.display = "none";
    if (this.finishBtn) this.finishBtn.style.display = "none";
    if (this.resetBtn) this.resetBtn.style.display = "";
    if (uncompletedOrSkipSteps.length <= 1) {
      this.isCompleted = true;
      this.setCompleted();
    }
    this.fireEvent("finish", this.currentIndex);
    dispatch("finish.hs.stepper", this.el, this.currentIndex);
  }
  // reset
  buildResetButton() {
    if (!this.resetBtn) return;
    this.onResetBtnClickListener = () => this.resetBtnClick();
    this.resetBtn.addEventListener("click", this.onResetBtnClickListener);
  }
  handleResetButtonClick() {
    if (this.backBtn) this.backBtn.style.display = "";
    if (this.nextBtn) this.nextBtn.style.display = "";
    if (this.completeStepBtn) {
      this.completeStepBtn.style.display = "";
      this.completeStepBtn.innerText = this.completeStepBtnDefaultText;
      this.completeStepBtn.removeAttribute("disabled");
      this.completeStepBtn.classList.remove("disabled");
    }
    if (this.resetBtn) this.resetBtn.style.display = "none";
    this.navItems.forEach((item) => {
      const { el } = item;
      item.isSkip = false;
      item.isCompleted = false;
      this.unsetCurrentNavItemActions(el);
      el.classList.remove("success", "skipped");
    });
    this.contentItems.forEach((item) => {
      const { el } = item;
      item.isSkip = false;
      item.isCompleted = false;
      this.unsetCurrentContentItemActions(el);
      el.classList.remove("success", "skipped");
    });
    this.currentIndex = 1;
    this.unsetCompleted();
    this.isCompleted = false;
    this.showSkipButton();
    this.setCurrentNavItem();
    this.setCurrentContentItem();
    this.showFinishButton();
    this.showCompleteStepButton();
    this.checkForTheFirstStep();
    this.fireEvent("reset", this.currentIndex);
    dispatch("reset.hs.stepper", this.el, this.currentIndex);
  }
  // Public methods
  setProcessedNavItem(n) {
    const targetNavItem = this.getNavItem(n);
    if (!targetNavItem) return;
    this.setProcessedNavItemActions(targetNavItem);
  }
  unsetProcessedNavItem(n) {
    const targetNavItem = this.getNavItem(n);
    if (!targetNavItem) return;
    this.unsetProcessedNavItemActions(targetNavItem);
  }
  goToNext() {
    if (this.mode === "linear") this.setCompleteItem();
    this.handleNextButtonClick(this.mode !== "linear");
    if (this.mode === "linear" && this.currentIndex === this.totalSteps) {
      if (this.nextBtn) this.nextBtn.style.display = "none";
      if (this.completeStepBtn) this.completeStepBtn.style.display = "none";
    }
  }
  disableButtons() {
    if (this.backBtn) this.setToDisabled(this.backBtn);
    if (this.nextBtn) this.setToDisabled(this.nextBtn);
  }
  enableButtons() {
    if (this.backBtn) this.setToNonDisabled(this.backBtn);
    if (this.nextBtn) this.setToNonDisabled(this.nextBtn);
  }
  setErrorNavItem(n) {
    const targetNavItem = this.getNavItem(n);
    if (!targetNavItem) return;
    this.setErrorNavItemActions(targetNavItem);
  }
  destroy() {
    this.el.classList.remove("completed");
    this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((el) => {
      el.classList.remove("active", "success", "skipped", "disabled", "error");
      if (el.tagName === "BUTTON" || el.tagName === "INPUT")
        el.removeAttribute("disabled");
    });
    this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((el) => {
      el.classList.remove("success", "skipped");
    });
    if (this.backBtn) this.backBtn.classList.remove("disabled");
    if (this.nextBtn) this.nextBtn.classList.remove("disabled");
    if (this.completeStepBtn) this.completeStepBtn.classList.remove("disabled");
    if (this.backBtn) this.backBtn.style.display = "";
    if (this.nextBtn) this.nextBtn.style.display = "";
    if (this.skipBtn) this.skipBtn.style.display = "";
    if (this.finishBtn) this.finishBtn.style.display = "none";
    if (this.resetBtn) this.resetBtn.style.display = "none";
    if (this.onNavItemClickListener.length)
      this.onNavItemClickListener.forEach(({ el, fn: fn2 }) => {
        el.removeEventListener("click", fn2);
      });
    if (this.backBtn)
      this.backBtn.removeEventListener("click", this.onBackClickListener);
    if (this.nextBtn)
      this.nextBtn.removeEventListener("click", this.onNextClickListener);
    if (this.skipBtn)
      this.skipBtn.removeEventListener("click", this.onSkipClickListener);
    if (this.completeStepBtn)
      this.completeStepBtn.removeEventListener(
        "click",
        this.onCompleteStepBtnClickListener
      );
    if (this.finishBtn)
      this.finishBtn.removeEventListener(
        "click",
        this.onFinishBtnClickListener
      );
    if (this.resetBtn)
      this.resetBtn.removeEventListener("click", this.onResetBtnClickListener);
    window.$hsStepperCollection = window.$hsStepperCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsStepperCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsStepperCollection) window.$hsStepperCollection = [];
    if (window.$hsStepperCollection)
      window.$hsStepperCollection = window.$hsStepperCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsStepperCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSStepper(el);
    });
  }
};
window.addEventListener("load", () => {
  HSStepper.autoInit();
});
if (typeof window !== "undefined") {
  window.HSStepper = HSStepper;
}
var stepper_default = HSStepper;

// node_modules/preline/src/plugins/strong-password/index.ts
init_utils();
init_base_plugin();
var HSStrongPassword = class _HSStrongPassword extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "target");
    __publicField(this, "hints");
    __publicField(this, "stripClasses");
    __publicField(this, "minLength");
    __publicField(this, "mode");
    __publicField(this, "popoverSpace");
    __publicField(this, "checksExclude");
    __publicField(this, "specialCharactersSet");
    __publicField(this, "isOpened", false);
    __publicField(this, "strength", 0);
    __publicField(this, "passedRules", /* @__PURE__ */ new Set());
    __publicField(this, "weakness");
    __publicField(this, "rules");
    __publicField(this, "availableChecks");
    __publicField(this, "onTargetInputListener");
    __publicField(this, "onTargetFocusListener");
    __publicField(this, "onTargetBlurListener");
    __publicField(this, "onTargetInputSecondListener");
    __publicField(this, "onTargetInputThirdListener");
    const data = el.getAttribute("data-hs-strong-password");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.target = (concatOptions == null ? void 0 : concatOptions.target) ? typeof (concatOptions == null ? void 0 : concatOptions.target) === "string" ? document.querySelector(concatOptions.target) : concatOptions.target : null;
    this.hints = (concatOptions == null ? void 0 : concatOptions.hints) ? typeof (concatOptions == null ? void 0 : concatOptions.hints) === "string" ? document.querySelector(concatOptions.hints) : concatOptions.hints : null;
    this.stripClasses = (concatOptions == null ? void 0 : concatOptions.stripClasses) || null;
    this.minLength = (concatOptions == null ? void 0 : concatOptions.minLength) || 6;
    this.mode = (concatOptions == null ? void 0 : concatOptions.mode) || "default";
    this.popoverSpace = (concatOptions == null ? void 0 : concatOptions.popoverSpace) || 10;
    this.checksExclude = (concatOptions == null ? void 0 : concatOptions.checksExclude) || [];
    this.availableChecks = [
      "lowercase",
      "uppercase",
      "numbers",
      "special-characters",
      "min-length"
    ].filter((el2) => !this.checksExclude.includes(el2));
    this.specialCharactersSet = (concatOptions == null ? void 0 : concatOptions.specialCharactersSet) || "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~";
    if (this.target) this.init();
  }
  targetInput(evt) {
    this.setStrength(evt.target.value);
  }
  targetFocus() {
    this.isOpened = true;
    this.hints.classList.remove("hidden");
    this.hints.classList.add("block");
    this.recalculateDirection();
  }
  targetBlur() {
    this.isOpened = false;
    this.hints.classList.remove(
      "block",
      "bottom-full",
      "top-full"
    );
    this.hints.classList.add("hidden");
    this.hints.style.marginTop = "";
    this.hints.style.marginBottom = "";
  }
  targetInputSecond() {
    this.setWeaknessText();
  }
  targetInputThird() {
    this.setRulesText();
  }
  init() {
    this.createCollection(window.$hsStrongPasswordCollection, this);
    if (this.availableChecks.length) this.build();
  }
  build() {
    this.buildStrips();
    if (this.hints) this.buildHints();
    this.setStrength(this.target.value);
    this.onTargetInputListener = (evt) => this.targetInput(evt);
    this.target.addEventListener(
      "input",
      this.onTargetInputListener
    );
  }
  buildStrips() {
    this.el.innerHTML = "";
    if (this.stripClasses) {
      for (let i = 0; i < this.availableChecks.length; i++) {
        const newStrip = htmlToElement("<div></div>");
        classToClassList(this.stripClasses, newStrip);
        this.el.append(newStrip);
      }
    }
  }
  buildHints() {
    this.weakness = this.hints.querySelector(
      "[data-hs-strong-password-hints-weakness-text]"
    ) || null;
    this.rules = Array.from(
      this.hints.querySelectorAll(
        "[data-hs-strong-password-hints-rule-text]"
      )
    ) || null;
    this.rules.forEach((rule) => {
      var _a;
      const ruleValue = rule.getAttribute(
        "data-hs-strong-password-hints-rule-text"
      );
      if ((_a = this.checksExclude) == null ? void 0 : _a.includes(ruleValue)) rule.remove();
    });
    if (this.weakness) this.buildWeakness();
    if (this.rules) this.buildRules();
    if (this.mode === "popover") {
      this.onTargetFocusListener = () => this.targetFocus();
      this.onTargetBlurListener = () => this.targetBlur();
      this.target.addEventListener(
        "focus",
        this.onTargetFocusListener
      );
      this.target.addEventListener(
        "blur",
        this.onTargetBlurListener
      );
    }
  }
  buildWeakness() {
    this.checkStrength(this.target.value);
    this.setWeaknessText();
    this.onTargetInputSecondListener = () => setTimeout(() => this.targetInputSecond());
    this.target.addEventListener(
      "input",
      this.onTargetInputSecondListener
    );
  }
  buildRules() {
    this.setRulesText();
    this.onTargetInputThirdListener = () => setTimeout(() => this.targetInputThird());
    this.target.addEventListener(
      "input",
      this.onTargetInputThirdListener
    );
  }
  setWeaknessText() {
    const weaknessText = this.weakness.getAttribute(
      "data-hs-strong-password-hints-weakness-text"
    );
    const weaknessTextToJson = JSON.parse(weaknessText);
    this.weakness.textContent = weaknessTextToJson[this.strength];
  }
  setRulesText() {
    this.rules.forEach((rule) => {
      const ruleValue = rule.getAttribute(
        "data-hs-strong-password-hints-rule-text"
      );
      this.checkIfPassed(rule, this.passedRules.has(ruleValue));
    });
  }
  togglePopover() {
    const popover = this.el.querySelector(".popover");
    if (popover) popover.classList.toggle("show");
  }
  checkStrength(val) {
    const passedRules = /* @__PURE__ */ new Set();
    const regexps = {
      lowercase: /[a-z]+/,
      uppercase: /[A-Z]+/,
      numbers: /[0-9]+/,
      "special-characters": new RegExp(`[${this.specialCharactersSet}]`)
    };
    let strength = 0;
    if (this.availableChecks.includes("lowercase") && val.match(regexps["lowercase"])) {
      strength += 1;
      passedRules.add("lowercase");
    }
    if (this.availableChecks.includes("uppercase") && val.match(regexps["uppercase"])) {
      strength += 1;
      passedRules.add("uppercase");
    }
    if (this.availableChecks.includes("numbers") && val.match(regexps["numbers"])) {
      strength += 1;
      passedRules.add("numbers");
    }
    if (this.availableChecks.includes("special-characters") && val.match(regexps["special-characters"])) {
      strength += 1;
      passedRules.add("special-characters");
    }
    if (this.availableChecks.includes("min-length") && val.length >= this.minLength) {
      strength += 1;
      passedRules.add("min-length");
    }
    if (!val.length) {
      strength = 0;
    }
    if (strength === this.availableChecks.length)
      this.el.classList.add("accepted");
    else this.el.classList.remove("accepted");
    this.strength = strength;
    this.passedRules = passedRules;
    return {
      strength: this.strength,
      rules: this.passedRules
    };
  }
  checkIfPassed(el, isRulePassed = false) {
    const check = el.querySelector("[data-check]");
    const uncheck = el.querySelector("[data-uncheck]");
    if (isRulePassed) {
      el.classList.add("active");
      check.classList.remove("hidden");
      uncheck.classList.add("hidden");
    } else {
      el.classList.remove("active");
      check.classList.add("hidden");
      uncheck.classList.remove("hidden");
    }
  }
  setStrength(val) {
    const { strength, rules } = this.checkStrength(val);
    const payload = {
      strength,
      rules
    };
    this.hideStrips(strength);
    this.fireEvent("change", payload);
    dispatch("change.hs.strongPassword", this.el, payload);
  }
  hideStrips(qty) {
    Array.from(this.el.children).forEach((el, i) => {
      if (i < qty) el.classList.add("passed");
      else el.classList.remove("passed");
    });
  }
  // Public methods
  recalculateDirection() {
    if (isEnoughSpace(
      this.hints,
      this.target,
      "bottom",
      this.popoverSpace
    )) {
      this.hints.classList.remove("bottom-full");
      this.hints.classList.add("top-full");
      this.hints.style.marginBottom = "";
      this.hints.style.marginTop = `${this.popoverSpace}px`;
    } else {
      this.hints.classList.remove("top-full");
      this.hints.classList.add("bottom-full");
      this.hints.style.marginTop = "";
      this.hints.style.marginBottom = `${this.popoverSpace}px`;
    }
  }
  destroy() {
    this.target.removeEventListener(
      "input",
      this.onTargetInputListener
    );
    this.target.removeEventListener(
      "focus",
      this.onTargetFocusListener
    );
    this.target.removeEventListener(
      "blur",
      this.onTargetBlurListener
    );
    this.target.removeEventListener(
      "input",
      this.onTargetInputSecondListener
    );
    this.target.removeEventListener(
      "input",
      this.onTargetInputThirdListener
    );
    window.$hsStrongPasswordCollection = window.$hsStrongPasswordCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsStrongPasswordCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsStrongPasswordCollection)
      window.$hsStrongPasswordCollection = [];
    if (window.$hsStrongPasswordCollection)
      window.$hsStrongPasswordCollection = window.$hsStrongPasswordCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(
      "[data-hs-strong-password]:not(.--prevent-on-load-init)"
    ).forEach((el) => {
      if (!window.$hsStrongPasswordCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      )) {
        const data = el.getAttribute("data-hs-strong-password");
        const options = data ? JSON.parse(data) : {};
        new _HSStrongPassword(el, options);
      }
    });
  }
};
window.addEventListener("load", () => {
  HSStrongPassword.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsStrongPasswordCollection) return false;
  const target = window.$hsStrongPasswordCollection.find(
    (el) => el.element.isOpened
  );
  if (target) target.element.recalculateDirection();
});
if (typeof window !== "undefined") {
  window.HSStrongPassword = HSStrongPassword;
}
var strong_password_default = HSStrongPassword;

// node_modules/preline/src/plugins/tabs/index.ts
init_utils();
init_base_plugin();
var HSTabs = class _HSTabs extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "toggles");
    __publicField(this, "extraToggleId");
    __publicField(this, "extraToggle");
    __publicField(this, "current");
    __publicField(this, "currentContentId");
    __publicField(this, "currentContent");
    __publicField(this, "prev");
    __publicField(this, "prevContentId");
    __publicField(this, "prevContent");
    __publicField(this, "onToggleClickListener");
    __publicField(this, "onExtraToggleChangeListener");
    __publicField(this, "eventType");
    this.toggles = this.el.querySelectorAll("[data-hs-tab]");
    this.extraToggleId = this.el.getAttribute("data-hs-tab-select");
    this.extraToggle = document.querySelector(this.extraToggleId);
    this.current = Array.from(this.toggles).find(
      (el2) => el2.classList.contains("active")
    );
    this.currentContentId = this.current.getAttribute("data-hs-tab");
    this.currentContent = document.querySelector(this.currentContentId);
    this.prev = null;
    this.prevContentId = null;
    this.prevContent = null;
    this.eventType = "click";
    this.onToggleClickListener = [];
    this.init();
  }
  toggleClick(el) {
    this.open(el);
  }
  extraToggleChange(evt) {
    this.change(evt);
  }
  init() {
    this.createCollection(window.$hsTabsCollection, this);
    this.toggles.forEach((el) => {
      this.onToggleClickListener.push({
        el,
        fn: () => this.toggleClick(el)
      });
      el.addEventListener(
        this.eventType,
        this.onToggleClickListener.find((toggle) => toggle.el === el).fn
      );
    });
    if (this.extraToggle) {
      this.onExtraToggleChangeListener = (evt) => this.extraToggleChange(evt);
      this.extraToggle.addEventListener(
        "change",
        this.onExtraToggleChangeListener
      );
    }
  }
  open(el) {
    var _a, _b;
    this.prev = this.current;
    this.prevContentId = this.currentContentId;
    this.prevContent = this.currentContent;
    this.current = el;
    this.currentContentId = this.current.getAttribute("data-hs-tab");
    this.currentContent = document.querySelector(this.currentContentId);
    if ((_a = this == null ? void 0 : this.prev) == null ? void 0 : _a.ariaSelected) this.prev.ariaSelected = "false";
    this.prev.classList.remove("active");
    this.prevContent.classList.add("hidden");
    if ((_b = this == null ? void 0 : this.current) == null ? void 0 : _b.ariaSelected) this.current.ariaSelected = "true";
    this.current.classList.add("active");
    this.currentContent.classList.remove("hidden");
    this.fireEvent("change", {
      el,
      prev: this.prevContentId,
      current: this.currentContentId
    });
    dispatch("change.hs.tab", el, {
      el,
      prev: this.prevContentId,
      current: this.currentContentId
    });
  }
  change(evt) {
    const toggle = document.querySelector(
      `[data-hs-tab="${evt.target.value}"]`
    );
    if (toggle) toggle.click();
  }
  // Public methods
  destroy() {
    this.toggles.forEach((el) => {
      el.removeEventListener(
        this.eventType,
        this.onToggleClickListener.find((toggle) => toggle.el === el).fn
      );
    });
    this.onToggleClickListener = [];
    if (this.extraToggle)
      this.extraToggle.removeEventListener(
        "change",
        this.onExtraToggleChangeListener
      );
    window.$hsTabsCollection = window.$hsTabsCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsTabsCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsTabsCollection) {
      window.$hsTabsCollection = [];
      document.addEventListener("keydown", (evt) => _HSTabs.accessibility(evt));
    }
    if (window.$hsTabsCollection)
      window.$hsTabsCollection = window.$hsTabsCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(
      '[role="tablist"]:not(select):not(.--prevent-on-load-init)'
    ).forEach((el) => {
      if (!window.$hsTabsCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSTabs(el);
    });
  }
  static open(target) {
    const elInCollection = window.$hsTabsCollection.find(
      (el) => Array.from(el.element.toggles).includes(
        typeof target === "string" ? document.querySelector(target) : target
      )
    );
    const targetInCollection = Array.from(elInCollection.element.toggles).find(
      (el) => el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    if (targetInCollection && !targetInCollection.classList.contains("active"))
      elInCollection.element.open(targetInCollection);
  }
  // Accessibility methods
  static accessibility(evt) {
    const target = document.querySelector("[data-hs-tab]:focus");
    if (target && TABS_ACCESSIBILITY_KEY_SET.includes(evt.code) && !evt.metaKey) {
      const isVertical = target.closest('[role="tablist"]').getAttribute("data-hs-tabs-vertical");
      evt.preventDefault();
      switch (evt.code) {
        case (isVertical === "true" ? "ArrowUp" : "ArrowLeft"):
          this.onArrow();
          break;
        case (isVertical === "true" ? "ArrowDown" : "ArrowRight"):
          this.onArrow(false);
          break;
        case "Home":
          this.onStartEnd();
          break;
        case "End":
          this.onStartEnd(false);
          break;
        default:
          break;
      }
    }
  }
  static onArrow(isOpposite = true) {
    const target = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]');
    const targetInCollection = window.$hsTabsCollection.find(
      (el) => el.element.el === target
    );
    if (targetInCollection) {
      const toggles = isOpposite ? Array.from(targetInCollection.element.toggles).reverse() : Array.from(targetInCollection.element.toggles);
      const focused = toggles.find((el) => document.activeElement === el);
      let focusedInd = toggles.findIndex((el) => el === focused);
      focusedInd = focusedInd + 1 < toggles.length ? focusedInd + 1 : 0;
      toggles[focusedInd].focus();
      toggles[focusedInd].click();
    }
  }
  static onStartEnd(isOpposite = true) {
    const target = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]');
    const targetInCollection = window.$hsTabsCollection.find(
      (el) => el.element.el === target
    );
    if (targetInCollection) {
      const toggles = isOpposite ? Array.from(targetInCollection.element.toggles) : Array.from(targetInCollection.element.toggles).reverse();
      if (toggles.length) {
        toggles[0].focus();
        toggles[0].click();
      }
    }
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const elInCollection = window.$hsTabsCollection.find(
      (el) => Array.from(el.element.toggles).includes(
        typeof target === "string" ? document.querySelector(target) : target
      )
    );
    if (elInCollection) elInCollection.element.events[evt] = cb;
  }
};
window.addEventListener("load", () => {
  HSTabs.autoInit();
});
if (typeof window !== "undefined") {
  window.HSTabs = HSTabs;
}
var tabs_default = HSTabs;

// node_modules/preline/src/plugins/textarea-auto-height/index.ts
init_base_plugin();
var HSTextareaAutoHeight = class _HSTextareaAutoHeight extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "defaultHeight");
    __publicField(this, "onElementInputListener");
    const data = el.getAttribute("data-hs-copy-markup");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.defaultHeight = (concatOptions == null ? void 0 : concatOptions.defaultHeight) || 0;
    this.init();
  }
  elementInput() {
    this.textareaSetHeight(3);
  }
  init() {
    this.createCollection(window.$hsTextareaAutoHeightCollection, this);
    this.setAutoHeight();
  }
  setAutoHeight() {
    if (this.isParentHidden()) this.callbackAccordingToType();
    else this.textareaSetHeight(3);
    this.onElementInputListener = () => this.elementInput();
    this.el.addEventListener("input", this.onElementInputListener);
  }
  textareaSetHeight(offsetTop = 0) {
    this.el.style.height = "auto";
    this.el.style.height = this.checkIfOneLine() && this.defaultHeight ? `${this.defaultHeight}px` : `${this.el.scrollHeight + offsetTop}px`;
  }
  checkIfOneLine() {
    const clientHeight = this.el.clientHeight;
    const scrollHeight = this.el.scrollHeight;
    if (scrollHeight > clientHeight) return false;
    else return true;
  }
  isParentHidden() {
    return this.el.closest(".hs-overlay.hidden") || this.el.closest('[role="tabpanel"].hidden') || this.el.closest(".hs-collapse.hidden");
  }
  parentType() {
    if (this.el.closest(".hs-collapse")) return "collapse";
    else if (this.el.closest(".hs-overlay")) return "overlay";
    else if (this.el.closest('[role="tabpanel"]')) return "tabs";
    else return false;
  }
  callbackAccordingToType() {
    var _a;
    if (this.parentType() === "tabs") {
      const tabId = (_a = this.el.closest('[role="tabpanel"]')) == null ? void 0 : _a.id;
      const tab = document.querySelector(`[data-hs-tab="#${tabId}"]`);
      const tabs = tab.closest('[role="tablist"]');
      const { element } = window.HSTabs.getInstance(tabs, true) || null;
      element.on("change", (payload) => {
        const textareas = document.querySelectorAll(`${payload.current} [data-hs-textarea-auto-height]`);
        if (!textareas.length) return false;
        textareas.forEach((el) => {
          const instance = window.HSTextareaAutoHeight.getInstance(el, true) || null;
          if (instance) instance.element.textareaSetHeight(3);
        });
      });
    } else if (this.parentType() === "collapse") {
      const collapseId = this.el.closest(".hs-collapse").id;
      const { element } = window.HSCollapse.getInstance(
        `[data-hs-collapse="#${collapseId}"]`,
        true
      );
      element.on("beforeOpen", () => {
        if (!this.el) return false;
        this.textareaSetHeight(3);
      });
    } else if (this.parentType() === "overlay") {
      const { element } = window.HSOverlay.getInstance(
        this.el.closest(".hs-overlay"),
        true
      );
      element.on("open", () => {
        if (!this.el) return false;
        this.textareaSetHeight(3);
      });
    } else return false;
  }
  // Public methods
  destroy() {
    this.el.removeEventListener("input", this.onElementInputListener);
    window.$hsTextareaAutoHeightCollection = window.$hsTextareaAutoHeightCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static method
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsTextareaAutoHeightCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsTextareaAutoHeightCollection)
      window.$hsTextareaAutoHeightCollection = [];
    if (window.$hsTextareaAutoHeightCollection)
      window.$hsTextareaAutoHeightCollection = window.$hsTextareaAutoHeightCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(
      "[data-hs-textarea-auto-height]:not(.--prevent-on-load-init)"
    ).forEach((el) => {
      if (!window.$hsTextareaAutoHeightCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      )) {
        const data = el.getAttribute("data-hs-textarea-auto-height");
        const options = data ? JSON.parse(data) : {};
        new _HSTextareaAutoHeight(el, options);
      }
    });
  }
};
window.addEventListener("load", () => {
  HSTextareaAutoHeight.autoInit();
});
if (typeof window !== "undefined") {
  window.HSTextareaAutoHeight = HSTextareaAutoHeight;
}
var textarea_auto_height_default = HSTextareaAutoHeight;

// node_modules/preline/src/plugins/theme-switch/index.ts
init_base_plugin();
var HSThemeSwitch = class _HSThemeSwitch extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "theme");
    __publicField(this, "type");
    __publicField(this, "themeSet");
    __publicField(this, "onElementChangeListener");
    __publicField(this, "onElementClickListener");
    const data = el.getAttribute("data-hs-theme-switch");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.theme = (concatOptions == null ? void 0 : concatOptions.theme) || localStorage.getItem("hs_theme") || "default";
    this.type = (concatOptions == null ? void 0 : concatOptions.type) || "change";
    this.themeSet = ["light", "dark", "default"];
    this.init();
  }
  elementChange(evt) {
    const theme = evt.target.checked ? "dark" : "default";
    this.setAppearance(theme);
    this.toggleObserveSystemTheme();
  }
  elementClick(theme) {
    this.setAppearance(theme);
    this.toggleObserveSystemTheme();
  }
  init() {
    this.createCollection(window.$hsThemeSwitchCollection, this);
    if (this.theme !== "default") this.setAppearance();
    if (this.type === "click") this.buildSwitchTypeOfClick();
    else this.buildSwitchTypeOfChange();
  }
  buildSwitchTypeOfChange() {
    this.el.checked = this.theme === "dark";
    this.toggleObserveSystemTheme();
    this.onElementChangeListener = (evt) => this.elementChange(evt);
    this.el.addEventListener("change", this.onElementChangeListener);
  }
  buildSwitchTypeOfClick() {
    const theme = this.el.getAttribute("data-hs-theme-click-value");
    this.toggleObserveSystemTheme();
    this.onElementClickListener = () => this.elementClick(theme);
    this.el.addEventListener("click", this.onElementClickListener);
  }
  setResetStyles() {
    const style = document.createElement("style");
    style.innerText = `*{transition: unset !important;}`;
    style.setAttribute("data-hs-appearance-onload-styles", "");
    document.head.appendChild(style);
    return style;
  }
  addSystemThemeObserver() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
      if (matches) this.setAppearance("dark", false);
      else this.setAppearance("default", false);
    });
  }
  removeSystemThemeObserver() {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener;
  }
  toggleObserveSystemTheme() {
    if (localStorage.getItem("hs_theme") === "auto")
      this.addSystemThemeObserver();
    else this.removeSystemThemeObserver();
  }
  // Public methods
  setAppearance(theme = this.theme, isSaveToLocalStorage = true, isSetDispatchEvent = true) {
    const html = document.querySelector("html");
    const resetStyles = this.setResetStyles();
    if (isSaveToLocalStorage) localStorage.setItem("hs_theme", theme);
    if (theme === "auto")
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
    html.classList.remove("light", "dark", "default", "auto");
    html.classList.add(theme);
    setTimeout(() => resetStyles.remove());
    if (isSetDispatchEvent)
      window.dispatchEvent(
        new CustomEvent("on-hs-appearance-change", { detail: theme })
      );
  }
  destroy() {
    if (this.type === "change")
      this.el.removeEventListener("change", this.onElementChangeListener);
    if (this.type === "click")
      this.el.removeEventListener("click", this.onElementClickListener);
    window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsThemeSwitchCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsThemeSwitchCollection) window.$hsThemeSwitchCollection = [];
    if (window.$hsThemeSwitchCollection)
      window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsThemeSwitchCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSThemeSwitch(el, { type: "change" });
    });
    document.querySelectorAll(
      "[data-hs-theme-click-value]:not(.--prevent-on-load-init)"
    ).forEach((el) => {
      if (!window.$hsThemeSwitchCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSThemeSwitch(el, { type: "click" });
    });
  }
};
window.addEventListener("load", () => {
  HSThemeSwitch.autoInit();
});
if (window.$hsThemeSwitchCollection) {
  window.addEventListener(
    "on-hs-appearance-change",
    (evt) => {
      window.$hsThemeSwitchCollection.forEach((el) => {
        el.element.el.checked = evt.detail === "dark";
      });
    }
  );
}
if (typeof window !== "undefined") {
  window.HSThemeSwitch = HSThemeSwitch;
}
var theme_switch_default = HSThemeSwitch;

// node_modules/preline/src/plugins/toggle-count/index.ts
init_base_plugin();
var HSToggleCount = class _HSToggleCount extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "target");
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "duration");
    __publicField(this, "isChecked");
    __publicField(this, "onToggleChangeListener");
    const data = el.getAttribute("data-hs-toggle-count");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.target = (concatOptions == null ? void 0 : concatOptions.target) ? typeof (concatOptions == null ? void 0 : concatOptions.target) === "string" ? document.querySelector(concatOptions.target) : concatOptions.target : null;
    this.min = (concatOptions == null ? void 0 : concatOptions.min) || 0;
    this.max = (concatOptions == null ? void 0 : concatOptions.max) || 0;
    this.duration = (concatOptions == null ? void 0 : concatOptions.duration) || 700;
    this.isChecked = this.target.checked || false;
    if (this.target) this.init();
  }
  toggleChange() {
    this.isChecked = !this.isChecked;
    this.toggle();
  }
  init() {
    this.createCollection(window.$hsToggleCountCollection, this);
    if (this.isChecked) this.el.innerText = String(this.max);
    this.onToggleChangeListener = () => this.toggleChange();
    this.target.addEventListener("change", this.onToggleChangeListener);
  }
  toggle() {
    if (this.isChecked) this.countUp();
    else this.countDown();
  }
  animate(from, to) {
    let startTimestamp = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / this.duration,
        1
      );
      this.el.innerText = String(Math.floor(progress * (to - from) + from));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }
  // Public methods
  countUp() {
    this.animate(this.min, this.max);
  }
  countDown() {
    this.animate(this.max, this.min);
  }
  destroy() {
    this.target.removeEventListener("change", this.onToggleChangeListener);
    window.$hsToggleCountCollection = window.$hsToggleCountCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsToggleCountCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsToggleCountCollection) window.$hsToggleCountCollection = [];
    if (window.$hsToggleCountCollection)
      window.$hsToggleCountCollection = window.$hsToggleCountCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-toggle-count]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsToggleCountCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSToggleCount(el);
    });
  }
};
window.addEventListener("load", () => {
  HSToggleCount.autoInit();
});
if (typeof window !== "undefined") {
  window.HSToggleCount = HSToggleCount;
}
var toggle_count_default = HSToggleCount;

// node_modules/preline/src/plugins/toggle-password/index.ts
init_utils();
init_base_plugin();
var HSTogglePassword = class _HSTogglePassword extends HSBasePlugin {
  constructor(el, options) {
    super(el, options);
    __publicField(this, "target");
    __publicField(this, "isShown");
    __publicField(this, "isMultiple");
    __publicField(this, "eventType");
    __publicField(this, "onElementActionListener");
    const data = el.getAttribute("data-hs-toggle-password");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    const targets = [];
    if ((concatOptions == null ? void 0 : concatOptions.target) && typeof (concatOptions == null ? void 0 : concatOptions.target) === "string") {
      const ids = concatOptions == null ? void 0 : concatOptions.target.split(",");
      ids.forEach((id) => {
        targets.push(document.querySelector(id));
      });
    } else if ((concatOptions == null ? void 0 : concatOptions.target) && typeof (concatOptions == null ? void 0 : concatOptions.target) === "object") {
      concatOptions.target.forEach(
        (el2) => targets.push(document.querySelector(el2))
      );
    } else {
      concatOptions.target.forEach(
        (el2) => targets.push(el2)
      );
    }
    this.target = targets;
    this.isShown = this.el.hasAttribute("type") ? this.el.checked : false;
    this.eventType = isFormElement(this.el) ? "change" : "click";
    this.isMultiple = this.target.length > 1 && !!this.el.closest("[data-hs-toggle-password-group]");
    if (this.target) this.init();
  }
  elementAction() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
    this.fireEvent("toggle", this.target);
    dispatch("toggle.hs.toggle-select", this.el, this.target);
  }
  init() {
    this.createCollection(window.$hsTogglePasswordCollection, this);
    if (!this.isShown) {
      this.hide();
    } else {
      this.show();
    }
    this.onElementActionListener = () => this.elementAction();
    this.el.addEventListener(this.eventType, this.onElementActionListener);
  }
  getMultipleToggles() {
    const group = this.el.closest("[data-hs-toggle-password-group]");
    const toggles = group.querySelectorAll("[data-hs-toggle-password]");
    const togglesInCollection = [];
    toggles.forEach((el) => {
      togglesInCollection.push(
        _HSTogglePassword.getInstance(el)
      );
    });
    return togglesInCollection;
  }
  // Public methods
  show() {
    if (this.isMultiple) {
      const toggles = this.getMultipleToggles();
      toggles.forEach(
        (el) => el ? el.isShown = true : false
      );
      this.el.closest("[data-hs-toggle-password-group]").classList.add("active");
    } else {
      this.isShown = true;
      this.el.classList.add("active");
    }
    this.target.forEach((el) => {
      el.type = "text";
    });
  }
  hide() {
    if (this.isMultiple) {
      const toggles = this.getMultipleToggles();
      toggles.forEach(
        (el) => el ? el.isShown = false : false
      );
      this.el.closest("[data-hs-toggle-password-group]").classList.remove("active");
    } else {
      this.isShown = false;
      this.el.classList.remove("active");
    }
    this.target.forEach((el) => {
      el.type = "password";
    });
  }
  destroy() {
    if (this.isMultiple) {
      this.el.closest("[data-hs-toggle-password-group]").classList.remove("active");
    } else {
      this.el.classList.remove("active");
    }
    this.target.forEach((el) => {
      el.type = "password";
    });
    this.el.removeEventListener(this.eventType, this.onElementActionListener);
    this.isShown = false;
    window.$hsTogglePasswordCollection = window.$hsTogglePasswordCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsTogglePasswordCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element : null;
  }
  static autoInit() {
    if (!window.$hsTogglePasswordCollection)
      window.$hsTogglePasswordCollection = [];
    if (window.$hsTogglePasswordCollection)
      window.$hsTogglePasswordCollection = window.$hsTogglePasswordCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(
      "[data-hs-toggle-password]:not(.--prevent-on-load-init)"
    ).forEach((el) => {
      if (!window.$hsTogglePasswordCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSTogglePassword(el);
    });
  }
};
window.addEventListener("load", () => {
  HSTogglePassword.autoInit();
});
if (typeof window !== "undefined") {
  window.HSTogglePassword = HSTogglePassword;
}
var toggle_password_default = HSTogglePassword;

// node_modules/preline/src/plugins/tooltip/index.ts
init_utils();
init_base_plugin();
var HSTooltip = class _HSTooltip extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "toggle");
    __publicField(this, "content");
    __publicField(this, "eventMode");
    __publicField(this, "preventPopper");
    __publicField(this, "popperInstance");
    __publicField(this, "placement");
    __publicField(this, "strategy");
    __publicField(this, "scope");
    __publicField(this, "onToggleClickListener");
    __publicField(this, "onToggleFocusListener");
    __publicField(this, "onToggleMouseEnterListener");
    __publicField(this, "onToggleMouseLeaveListener");
    __publicField(this, "onToggleHandleListener");
    if (this.el) {
      this.toggle = this.el.querySelector(".hs-tooltip-toggle") || this.el;
      this.content = this.el.querySelector(".hs-tooltip-content");
      this.eventMode = getClassProperty(this.el, "--trigger") || "hover";
      this.preventPopper = getClassProperty(
        this.el,
        "--prevent-popper",
        "false"
      );
      this.placement = getClassProperty(this.el, "--placement");
      this.strategy = getClassProperty(
        this.el,
        "--strategy"
      );
      this.scope = getClassProperty(this.el, "--scope") || "parent";
    }
    if (this.el && this.toggle && this.content) this.init();
  }
  toggleClick() {
    this.click();
  }
  toggleFocus() {
    this.focus();
  }
  toggleMouseEnter() {
    this.enter();
  }
  toggleMouseLeave() {
    this.leave();
  }
  toggleHandle() {
    this.hide();
    this.toggle.removeEventListener("click", this.onToggleHandleListener, true);
    this.toggle.removeEventListener("blur", this.onToggleHandleListener, true);
  }
  init() {
    this.createCollection(window.$hsTooltipCollection, this);
    if (this.eventMode === "click") {
      this.onToggleClickListener = () => this.toggleClick();
      this.toggle.addEventListener("click", this.onToggleClickListener);
    } else if (this.eventMode === "focus") {
      this.onToggleFocusListener = () => this.toggleFocus();
      this.toggle.addEventListener("click", this.onToggleFocusListener);
    } else if (this.eventMode === "hover") {
      this.onToggleMouseEnterListener = () => this.toggleMouseEnter();
      this.onToggleMouseLeaveListener = () => this.toggleMouseLeave();
      this.toggle.addEventListener(
        "mouseenter",
        this.onToggleMouseEnterListener
      );
      this.toggle.addEventListener(
        "mouseleave",
        this.onToggleMouseLeaveListener
      );
    }
    if (this.preventPopper === "false") this.buildPopper();
  }
  enter() {
    this._show();
  }
  leave() {
    this.hide();
  }
  click() {
    if (this.el.classList.contains("show")) return false;
    this._show();
    this.onToggleHandleListener = () => {
      setTimeout(() => this.toggleHandle());
    };
    this.toggle.addEventListener("click", this.onToggleHandleListener, true);
    this.toggle.addEventListener("blur", this.onToggleHandleListener, true);
  }
  focus() {
    this._show();
    const handle = () => {
      this.hide();
      this.toggle.removeEventListener("blur", handle, true);
    };
    this.toggle.addEventListener("blur", handle, true);
  }
  buildPopper() {
    if (this.scope === "window") document.body.appendChild(this.content);
    this.popperInstance = createPopper3(this.toggle, this.content, {
      placement: POSITIONS[this.placement] || "top",
      strategy: this.strategy || "fixed",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 5]
          }
        }
      ]
    });
  }
  _show() {
    this.content.classList.remove("hidden");
    if (this.scope === "window") this.content.classList.add("show");
    if (this.preventPopper === "false") {
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          {
            name: "eventListeners",
            enabled: true
          }
        ]
      }));
      this.popperInstance.update();
    }
    setTimeout(() => {
      this.el.classList.add("show");
      this.fireEvent("show", this.el);
      dispatch("show.hs.tooltip", this.el, this.el);
    });
  }
  // Public methods
  show() {
    switch (this.eventMode) {
      case "click":
        this.click();
        break;
      case "focus":
        this.focus();
        break;
      default:
        this.enter();
        break;
    }
    this.toggle.focus();
    this.toggle.style.outline = "none";
  }
  hide() {
    this.el.classList.remove("show");
    if (this.scope === "window") this.content.classList.remove("show");
    if (this.preventPopper === "false") {
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          {
            name: "eventListeners",
            enabled: false
          }
        ]
      }));
    }
    this.fireEvent("hide", this.el);
    dispatch("hide.hs.tooltip", this.el, this.el);
    afterTransition(this.content, () => {
      if (this.el.classList.contains("show")) return false;
      this.content.classList.add("hidden");
      this.toggle.style.outline = "";
    });
  }
  destroy() {
    this.el.classList.remove("show");
    this.content.classList.add("hidden");
    if (this.eventMode === "click") {
      this.toggle.removeEventListener("click", this.onToggleClickListener);
    } else if (this.eventMode === "focus") {
      this.toggle.removeEventListener("click", this.onToggleFocusListener);
    } else if (this.eventMode === "hover") {
      this.toggle.removeEventListener(
        "mouseenter",
        this.onToggleMouseEnterListener
      );
      this.toggle.removeEventListener(
        "mouseleave",
        this.onToggleMouseLeaveListener
      );
    }
    this.toggle.removeEventListener("click", this.onToggleHandleListener, true);
    this.toggle.removeEventListener("blur", this.onToggleHandleListener, true);
    this.popperInstance.destroy();
    this.popperInstance = null;
    window.$hsTooltipCollection = window.$hsTooltipCollection.filter(
      ({ element }) => element.el !== this.el
    );
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsTooltipCollection.find((el) => {
      if (target instanceof _HSTooltip) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance = false) {
    const elInCollection = window.$hsTooltipCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsTooltipCollection) window.$hsTooltipCollection = [];
    if (window.$hsTooltipCollection)
      window.$hsTooltipCollection = window.$hsTooltipCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll(".hs-tooltip:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsTooltipCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSTooltip(el);
    });
  }
  static show(target) {
    const instance = _HSTooltip.findInCollection(target);
    if (instance) instance.element.show();
  }
  static hide(target) {
    const instance = _HSTooltip.findInCollection(target);
    if (instance) instance.element.hide();
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSTooltip.findInCollection(target);
    if (instance) instance.element.events[evt] = cb;
  }
};
window.addEventListener("load", () => {
  HSTooltip.autoInit();
});
if (typeof window !== "undefined") {
  window.HSTooltip = HSTooltip;
}
var tooltip_default = HSTooltip;

// node_modules/preline/src/plugins/tree-view/index.ts
init_utils();
init_base_plugin();
var _HSTreeView = class _HSTreeView extends HSBasePlugin {
  constructor(el, options, events) {
    super(el, options, events);
    __publicField(this, "items", []);
    __publicField(this, "controlBy");
    __publicField(this, "autoSelectChildren");
    __publicField(this, "isIndeterminate");
    __publicField(this, "onElementClickListener");
    __publicField(this, "onControlChangeListener");
    const data = el.getAttribute("data-hs-tree-view");
    const dataOptions = data ? JSON.parse(data) : {};
    const concatOptions = {
      ...dataOptions,
      ...options
    };
    this.controlBy = (concatOptions == null ? void 0 : concatOptions.controlBy) || "button";
    this.autoSelectChildren = (concatOptions == null ? void 0 : concatOptions.autoSelectChildren) || false;
    this.isIndeterminate = (concatOptions == null ? void 0 : concatOptions.isIndeterminate) || true;
    this.onElementClickListener = [];
    this.onControlChangeListener = [];
    this.init();
  }
  elementClick(evt, el, data) {
    evt.stopPropagation();
    if (el.classList.contains("disabled")) return false;
    if (!evt.metaKey && !evt.shiftKey) this.unselectItem(data);
    this.selectItem(el, data);
    this.fireEvent("click", {
      el,
      data
    });
    dispatch("click.hs.treeView", this.el, {
      el,
      data
    });
  }
  controlChange(el, data) {
    if (this.autoSelectChildren) {
      this.selectItem(el, data);
      if (data.isDir) this.selectChildren(el, data);
      this.toggleParent(el);
    } else this.selectItem(el, data);
  }
  init() {
    this.createCollection(window.$hsTreeViewCollection, this);
    _HSTreeView.group += 1;
    this.initItems();
  }
  initItems() {
    this.el.querySelectorAll("[data-hs-tree-view-item]").forEach((el, ind) => {
      const data = JSON.parse(el.getAttribute("data-hs-tree-view-item"));
      if (!el.id) el.id = `tree-view-item-${_HSTreeView.group}-${ind}`;
      const concatData = {
        ...data,
        id: data.id ?? el.id,
        path: this.getPath(el),
        isSelected: data.isSelected ?? false
      };
      this.items.push(concatData);
      if (this.controlBy === "checkbox") this.controlByCheckbox(el, concatData);
      else this.controlByButton(el, concatData);
    });
  }
  controlByButton(el, data) {
    this.onElementClickListener.push({
      el,
      fn: (evt) => this.elementClick(evt, el, data)
    });
    el.addEventListener(
      "click",
      this.onElementClickListener.find((elI) => elI.el === el).fn
    );
  }
  controlByCheckbox(el, data) {
    const control = el.querySelector(`input[value="${data.value}"]`);
    if (!!control) {
      this.onControlChangeListener.push({
        el: control,
        fn: () => this.controlChange(el, data)
      });
      control.addEventListener(
        "change",
        this.onControlChangeListener.find((elI) => elI.el === control).fn
      );
    }
  }
  getItem(id) {
    return this.items.find((el) => el.id === id);
  }
  getPath(el) {
    var _a;
    const path = [];
    let parent = el.closest("[data-hs-tree-view-item]");
    while (!!parent) {
      const data = JSON.parse(parent.getAttribute("data-hs-tree-view-item"));
      path.push(data.value);
      parent = (_a = parent.parentElement) == null ? void 0 : _a.closest("[data-hs-tree-view-item]");
    }
    return path.reverse().join("/");
  }
  unselectItem(exception = null) {
    let selectedItems = this.getSelectedItems();
    if (exception)
      selectedItems = selectedItems.filter((el) => el.id !== exception.id);
    if (selectedItems.length) {
      selectedItems.forEach((el) => {
        const selectedElement = document.querySelector(`#${el.id}`);
        selectedElement.classList.remove("selected");
        this.changeItemProp(el.id, "isSelected", false);
      });
    }
  }
  selectItem(el, data) {
    if (data.isSelected) {
      el.classList.remove("selected");
      this.changeItemProp(data.id, "isSelected", false);
    } else {
      el.classList.add("selected");
      this.changeItemProp(data.id, "isSelected", true);
    }
  }
  selectChildren(el, data) {
    const items = el.querySelectorAll("[data-hs-tree-view-item]");
    Array.from(items).filter((elI) => !elI.classList.contains("disabled")).forEach((elI) => {
      const initialItemData = elI.id ? this.getItem(elI.id) : null;
      if (!initialItemData) return false;
      if (data.isSelected) {
        elI.classList.add("selected");
        this.changeItemProp(initialItemData.id, "isSelected", true);
      } else {
        elI.classList.remove("selected");
        this.changeItemProp(initialItemData.id, "isSelected", false);
      }
      const currentItemData = this.getItem(elI.id);
      const control = elI.querySelector(
        `input[value="${currentItemData.value}"]`
      );
      if (this.isIndeterminate) control.indeterminate = false;
      if (currentItemData.isSelected) control.checked = true;
      else control.checked = false;
    });
  }
  toggleParent(el) {
    var _a, _b;
    let parent = (_a = el.parentElement) == null ? void 0 : _a.closest("[data-hs-tree-view-item]");
    while (!!parent) {
      const items = parent.querySelectorAll(
        "[data-hs-tree-view-item]:not(.disabled)"
      );
      const data = JSON.parse(parent.getAttribute("data-hs-tree-view-item"));
      const control = parent.querySelector(
        `input[value="${data.value}"]`
      );
      let hasUnchecked = false;
      let checkedItems = 0;
      items.forEach((elI) => {
        const dataI = this.getItem(elI.id);
        if (dataI.isSelected) checkedItems += 1;
        if (!dataI.isSelected) hasUnchecked = true;
      });
      if (hasUnchecked) {
        parent.classList.remove("selected");
        this.changeItemProp(parent.id, "isSelected", false);
        control.checked = false;
      } else {
        parent.classList.add("selected");
        this.changeItemProp(parent.id, "isSelected", true);
        control.checked = true;
      }
      if (this.isIndeterminate) {
        if (checkedItems > 0 && checkedItems < items.length)
          control.indeterminate = true;
        else control.indeterminate = false;
      }
      parent = (_b = parent.parentElement) == null ? void 0 : _b.closest("[data-hs-tree-view-item]");
    }
  }
  // Public methods
  update() {
    this.items.map((el) => {
      const selector = document.querySelector(`#${el.id}`);
      if (el.path !== this.getPath(selector)) el.path = this.getPath(selector);
      return el;
    });
  }
  getSelectedItems() {
    return this.items.filter((el) => el.isSelected);
  }
  changeItemProp(id, prop, val) {
    this.items.map((el) => {
      if (el.id === id) el[prop] = val;
      return el;
    });
  }
  destroy() {
    this.onElementClickListener.forEach(({ el, fn: fn2 }) => {
      el.removeEventListener("click", fn2);
    });
    if (this.onControlChangeListener.length)
      this.onElementClickListener.forEach(({ el, fn: fn2 }) => {
        el.removeEventListener("change", fn2);
      });
    this.unselectItem();
    this.items = [];
    window.$hsTreeViewCollection = window.$hsTreeViewCollection.filter(
      ({ element }) => element.el !== this.el
    );
    _HSTreeView.group -= 1;
  }
  // Static methods
  static findInCollection(target) {
    return window.$hsTreeViewCollection.find((el) => {
      if (target instanceof _HSTreeView) return el.element.el === target.el;
      else if (typeof target === "string") return el.element.el === document.querySelector(target);
      else return el.element.el === target;
    }) || null;
  }
  static getInstance(target, isInstance) {
    const elInCollection = window.$hsTreeViewCollection.find(
      (el) => el.element.el === (typeof target === "string" ? document.querySelector(target) : target)
    );
    return elInCollection ? isInstance ? elInCollection : elInCollection.element.el : null;
  }
  static autoInit() {
    if (!window.$hsTreeViewCollection) window.$hsTreeViewCollection = [];
    if (window.$hsTreeViewCollection)
      window.$hsTreeViewCollection = window.$hsTreeViewCollection.filter(
        ({ element }) => document.contains(element.el)
      );
    document.querySelectorAll("[data-hs-tree-view]:not(.--prevent-on-load-init)").forEach((el) => {
      if (!window.$hsTreeViewCollection.find(
        (elC) => {
          var _a;
          return ((_a = elC == null ? void 0 : elC.element) == null ? void 0 : _a.el) === el;
        }
      ))
        new _HSTreeView(el);
    });
  }
  // Backward compatibility
  static on(evt, target, cb) {
    const instance = _HSTreeView.findInCollection(target);
    console.log(1);
    if (instance) instance.element.events[evt] = cb;
  }
};
__publicField(_HSTreeView, "group", 0);
var HSTreeView = _HSTreeView;
window.addEventListener("load", () => {
  HSTreeView.autoInit();
});
if (typeof window !== "undefined") {
  window.HSTreeView = HSTreeView;
}
var tree_view_default = HSTreeView;

// node_modules/preline/src/static/index.ts
init_utils();

// node_modules/preline/src/spa/index.ts
init_datatable();
init_file_upload();
init_range_slider();
var COLLECTIONS = [
  {
    key: "copy-markup",
    fn: copy_markup_default,
    collection: "$hsCopyMarkupCollection"
  },
  { key: "accordion", fn: accordion_default, collection: "$hsAccordionCollection" },
  { key: "carousel", fn: carousel_default, collection: "$hsCarouselCollection" },
  { key: "collapse", fn: collapse_default, collection: "$hsCollapseCollection" },
  { key: "combobox", fn: combobox_default, collection: "$hsComboBoxCollection" },
  { key: "datatable", fn: datatable_default, collection: "$hsDataTableCollection" },
  { key: "dropdown", fn: dropdown_default, collection: "$hsDropdownCollection" },
  {
    key: "file-upload",
    fn: file_upload_default,
    collection: "$hsFileUploadCollection"
  },
  {
    key: "input-number",
    fn: input_number_default,
    collection: "$hsInputNumberCollection"
  },
  {
    key: "layout-splitter",
    fn: layout_splitter_default,
    collection: "$hsLayoutSplitterCollection"
  },
  { key: "overlay", fn: overlay_default, collection: "$hsOverlayCollection" },
  { key: "pin-input", fn: pin_input_default, collection: "$hsPinInputCollection" },
  {
    key: "range-slider",
    fn: range_slider_default,
    collection: "$hsRangeSliderCollection"
  },
  {
    key: "remove-element",
    fn: remove_element_default,
    collection: "$hsRemoveElementCollection"
  },
  { key: "scrollspy", fn: scrollspy_default, collection: "$hsScrollspyCollection" },
  { key: "select", fn: select_default, collection: "$hsSelectCollection" },
  { key: "stepper", fn: stepper_default, collection: "$hsStepperCollection" },
  {
    key: "strong-password",
    fn: strong_password_default,
    collection: "$hsStrongPasswordCollection"
  },
  { key: "tabs", fn: tabs_default, collection: "$hsTabsCollection" },
  {
    key: "textarea-auto-height",
    fn: textarea_auto_height_default,
    collection: "$hsTextareaAutoHeightCollection"
  },
  {
    key: "theme-switch",
    fn: theme_switch_default,
    collection: "$hsThemeSwitchCollection"
  },
  {
    key: "toggle-count",
    fn: toggle_count_default,
    collection: "$hsToggleCountCollection"
  },
  {
    key: "toggle-password",
    fn: toggle_password_default,
    collection: "$hsTogglePasswordCollection"
  },
  { key: "tooltip", fn: tooltip_default, collection: "$hsTooltipCollection" },
  { key: "tree-view", fn: tree_view_default, collection: "$hsTreeViewCollection" }
];

// node_modules/preline/src/static/index.ts
var HSStaticMethods = {
  getClassProperty,
  afterTransition,
  autoInit(collection = "all") {
    if (collection === "all") {
      COLLECTIONS.forEach(({ fn: fn2 }) => {
        fn2 == null ? void 0 : fn2.autoInit();
      });
    } else {
      COLLECTIONS.forEach(({ key, fn: fn2 }) => {
        if (collection.includes(key)) fn2 == null ? void 0 : fn2.autoInit();
      });
    }
  },
  cleanCollection(name = "all") {
    if (name === "all") {
      COLLECTIONS.forEach(({ collection }) => {
        if (window[collection] instanceof Array) {
          window[collection] = [];
        }
      });
    } else {
      COLLECTIONS.forEach(({ key, collection }) => {
        if (name.includes(key) && window[collection] instanceof Array) {
          window[collection] = [];
        }
      });
    }
  }
};
if (typeof window !== "undefined") {
  window.HSStaticMethods = HSStaticMethods;
}
var static_default = HSStaticMethods;

// node_modules/preline/src/index.ts
var HSDataTableModule;
var HSFileUploadModule;
var HSRangeSliderModule;
if (typeof DataTable !== "undefined" && typeof jQuery !== "undefined")
  HSDataTableModule = (init_datatable(), __toCommonJS(datatable_exports)).default;
else HSDataTableModule = null;
if (typeof _ !== "undefined" && typeof Dropzone !== "undefined")
  HSFileUploadModule = (init_file_upload(), __toCommonJS(file_upload_exports)).default;
else HSFileUploadModule = null;
if (typeof noUiSlider !== "undefined")
  HSRangeSliderModule = (init_range_slider(), __toCommonJS(range_slider_exports)).default;
else HSRangeSliderModule = null;
export {
  accordion_default as HSAccordion,
  carousel_default as HSCarousel,
  collapse_default as HSCollapse,
  combobox_default as HSComboBox,
  copy_markup_default as HSCopyMarkup,
  HSDataTableModule as HSDataTable,
  dropdown_default as HSDropdown,
  HSFileUploadModule as HSFileUpload,
  input_number_default as HSInputNumber,
  layout_splitter_default as HSLayoutSplitter,
  overlay_default as HSOverlay,
  pin_input_default as HSPinInput,
  HSRangeSliderModule as HSRangeSlider,
  remove_element_default as HSRemoveElement,
  scrollspy_default as HSScrollspy,
  select_default as HSSelect,
  static_default as HSStaticMethods,
  stepper_default as HSStepper,
  strong_password_default as HSStrongPassword,
  tabs_default as HSTabs,
  textarea_auto_height_default as HSTextareaAutoHeight,
  theme_switch_default as HSThemeSwitch,
  toggle_count_default as HSToggleCount,
  toggle_password_default as HSTogglePassword,
  tooltip_default as HSTooltip,
  tree_view_default as HSTreeView
};
/*! Bundled license information:

preline/src/utils/index.ts:
  (*
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/base-plugin/index.ts:
  (*
   * HSBasePlugin
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/datatable/index.ts:
  (*
   * HSDataTable
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/file-upload/index.ts:
  (*
   * HSFileUpload
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/range-slider/index.ts:
  (*
   * HSRangeSlider
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/copy-markup/index.ts:
  (*
   * HSCopyMarkup
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/accordion/index.ts:
  (*
   * HSAccordion
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/carousel/index.ts:
  (*
   * HSCarousel
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/collapse/index.ts:
  (*
   * HSCollapse
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/combobox/index.ts:
  (*
   * HSComboBox
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/dropdown/index.ts:
  (*
   * HSDropdown
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/input-number/index.ts:
  (*
   * HSInputNumber
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/layout-splitter/index.ts:
  (*
   * HSLayoutSplitter
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/overlay/index.ts:
  (*
   * HSOverlay
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/pin-input/index.ts:
  (*
   * HSPinInput
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/remove-element/index.ts:
  (*
   * HSRemoveElement
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/scrollspy/index.ts:
  (*
   * HSScrollspy
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/select/index.ts:
  (*
   * HSSelect
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/stepper/index.ts:
  (*
   * HSStepper
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/strong-password/index.ts:
  (*
   * HSStrongPassword
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/tabs/index.ts:
  (*
   * HSTabs
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/textarea-auto-height/index.ts:
  (*
   * HSTextareaAutoHeight
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/theme-switch/index.ts:
  (*
   * HSThemeSwitch
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/toggle-count/index.ts:
  (*
   * HSToggleCount
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/toggle-password/index.ts:
  (*
   * HSTogglePassword
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/tooltip/index.ts:
  (*
   * HSTooltip
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/plugins/tree-view/index.ts:
  (*
   * HSTreeView
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/spa/index.ts:
  (*
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/static/index.ts:
  (*
   * HSStaticMethods
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/src/index.ts:
  (*
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
*/
//# sourceMappingURL=preline.js.map
