import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['basic', 'pro', 'premium'],
        default: 'basic',
        required: [true, 'La categoría es requerida'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'El método de pago es requerido'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es requerida'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'La fecha de inicio debe ser en el pasado',
        }
    },
    renewalDate: {
        type: Date,
        // ❌ ya no es required
        validate: {
            validator: function (value) {
                if (!value) return true; // se calcula en pre-save
                return value > this.startDate;
            },
            message: 'La fecha de renovación debe ser posterior a la de inicio',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido'],
        index: true,
    }
}, { timestamps: true });

// Middleware: calcular renewalDate y actualizar estado
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const daysByFrequency = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + daysByFrequency[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
