/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
    this.element = element;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const modalAccList = this.element.querySelector('select.accounts-select');
    modalAccList.innerHTML = '';
    const data = User.current();  
    Account.list(data, (err, response) => { 
      if (response.success) {
        response.data.forEach(accObj => modalAccList.insertAdjacentHTML('beforeend', 
        `<option value="${accObj.id}">${accObj.name}</option>`))
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(options.data, (err, response) => {
      if (response && response.success === true) {
        this.element.reset();
        const type = options.data.type;
        const modalName = "new" + type[0].toUpperCase() + type.substr(1);
        let transactionModal = App.getModal(modalName);
        transactionModal.close();
        App.update();
      }
    });
  }
}