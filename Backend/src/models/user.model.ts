import { Model, Schema, model, models, Document } from "mongoose";
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin" | "guest";
    isVerified?: boolean;
    avatar?: {
        id: string;
        imgUrl: string;
    },
    loginProvider?: "credentials" | "google";
    providerId?: "";
    isvalidPassword: (password: string) => Promise<boolean>
}

interface Method {
    isvalidPassword: (password: string) => Promise<boolean>
}

const userSchema  = new Schema<UserDocument, {}, Method>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: { type: String, enum: ["guest", "user", "admin", ], default: "user" },
    isVerified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        id: { type: String },
        imgUrl: { type: String },
    },
    loginProvider: {
        type: String,
        default: "credentials"
    },
    providerId: {
        type: String,
        default: ""
    }
}, { timestamps: true });


userSchema.pre("save", async function(next) {
    try {
        if(this.isModified("password")) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        throw error;
    }
});

userSchema.methods.isvalidPassword = async function(plainPassword) {
    try {
        return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
        throw error;
    }
}

userSchema.set("toJSON", {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
});

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Method>;