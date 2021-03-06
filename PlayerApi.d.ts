/**
 * Возможные остояния плеера.
 */
export declare enum PlayerState {
    INACTIVE = -1,
    STOPPED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
}
/**
 * Конфиг плейлиста, может быть строкой (ссылка на плейлист) или объектом.
 */
export interface SourceConfig {
    /**
     * Плейлист.
     */
    stream: string;
    /**
     * Начать проигрывание с заданной секунды.
     */
    startFrom?: number;
    /**
     * Ссылка на постер (картинка-превью).
     */
    preview?: string;
}
/**
 * Обработчики событий плеера.
 */
export interface PublicHandlers {
    /**
     * Вызывается, когда длительность загруженного плейлиста изменилась
     * @param duration
     */
    onDurationChanged: (duration: number) => void;
    /**
     * Вызывается, когда текущее время проигрывания изменилось.
     * @param currentTime
     */
    onCurrentTimeChanged: (currentTime: number) => void;
    /**
     * Вызывается, когда состояние плеера изменилось.
     * @param state
     */
    onStateChanged: (state: PlayerState) => void;
    /**
     * Вызывается, когда произошла ошибка.
     * @param error
     */
    onError: (error: any) => void;
}
/**
 * Параметры конфигурации плеера.
 */
export interface PlayerParams {
    /**
     * Конфигурация плейлиста или ссылка на плейлист, который будет загружен в созданном плеере.
     */
    source: SourceConfig | string;
    /**
     * Элемент/#id, в котором будет создан плеер.
     */
    element: string | HTMLElement;
    /**
     * Будет ли проигрывание начинаться автоматически после инициализации плеера.
     */
    autoplay?: boolean;
    /**
     * Объект с обработчиками событий плеера.
     */
    handlers?: Partial<PublicHandlers>;
}
export declare abstract class PlayerApi {
    /**
     * Создает плеер с переданными параметрами.
     * @param params - Параметры нового плеера.
     * @returns Объект плеера.
     */
    constructor(params: PlayerParams);
    /**
     * @returns Текущее состояние плеера.
     */
    abstract getState(): PlayerState;
    /**
     * @returns Текущее время воспроизведения в секундах (может быть не актуально для LIVE плейлистов).
     */
    abstract getCurrentTime(): number;
    /**
     * @returns Текущая продолжительность видео (может быть не актуально для LIVE и EVENT плейлистов).
     */
    abstract getDuration(): number;
    /**
     * @returns Текущее значение громкости (от 0 до 100).
     */
    abstract getVolume(): number;
    /**
     * Задает значение громкости (от 0 до 100).
     * @param volume - Новое значение громкости.
     * @returns {void}
     */
    abstract setVolume(volume: number): void;
    /**
     * Уничножает экземпляр плеера и все созданые им DOM-элементы.
     * @returns {void}
     */
    abstract destroy(): void;
    /**
     * Начать проигрывание.
     * @returns {void}
     */
    abstract play(): void;
    /**
     * Поставить плеер на паузу.
     * @returns {void}
     */
    abstract pause(): void;
    /**
     * Перемотать проигрывание на заданное время
     * @param {number} time - Время в секундах
     * @returns {void}
     */
    abstract seek(time: number): void;
    /**
     * Сменить текущую конфигурацию плейлиста.
     * @param config - Строка с ссылкой на плейлист или объект с конфигурацией плейлиста.
     * @returns {void}
     */
    abstract setSource(config: SourceConfig | string): void;
}
