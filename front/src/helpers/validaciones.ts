export interface FormValues {
    name: string;
    phone: string;
    comments: string;
    selectedDate: Date | null;
    occupiedDates: string[];
  }
  
  // Tipos de error para las validaciones
  export interface ValidationErrors {
    name?: string;
    phone?: string;
    selectedDate?: string;
    comments?: string;
  }
  
  /**
   * Valida los valores del formulario de reserva.
   * @param values - Valores del formulario
   * @returns Un objeto con los errores encontrados
   */
  export const validateForm = (values: FormValues): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    // Validación del nombre
    if (!values.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    } else if (values.name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres.";
    }
  
    // Validación del teléfono
    const phoneRegex = /^[+]?[0-9]{10,15}$/; // Soporta números internacionales y locales
    if (!values.phone.trim()) {
      errors.phone = "El número de teléfono es obligatorio.";
    } else if (!phoneRegex.test(values.phone.trim())) {
      errors.phone = "El número de teléfono no es válido.";
    }
  
    // Validación de la fecha seleccionada
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!values.selectedDate) {
      errors.selectedDate = "Debes seleccionar una fecha.";
    } else {
      const selectedDateString = values.selectedDate.toISOString().split("T")[0];
      if (values.selectedDate < today) {
        errors.selectedDate = "No puedes seleccionar una fecha pasada.";
      } else if (values.occupiedDates.includes(selectedDateString)) {
        errors.selectedDate = "La fecha seleccionada ya está ocupada.";
      }
    }
  
    // Validación de comentarios (opcional)
    if (values.comments && values.comments.length > 200) {
      errors.comments = "Los comentarios no pueden exceder 200 caracteres.";
    }
  
    return errors;
  };
  